import { useState, useCallback, useRef, useEffect } from 'react';
import * as THREE from 'three';

export interface TurboState {
  isCharging: boolean;
  isJumping: boolean;
  isResetting: boolean;
  progress: number;
  canActivate: boolean;
  energy: number;
  maxEnergy: number;
  energyRechargeRate: number;
  energyConsumptionRate: number;
  isCooldown: boolean;
  cooldownProgress: number;
  ftlCharge: number;
  ftlChargeRate: number;
  ftlDischargeRate: number;
  ftlThreshold: number;
  isFTLReady: boolean;
  visualEffects: {
    distortion: number;
    chromaticAberration: number;
    motionBlur: number;
    glowIntensity: number;
  };
}

export const useTurboControl = () => {
  const [turboState, setTurboState] = useState<TurboState>({
    isCharging: false,
    isJumping: false,
    isResetting: false,
    progress: 0,
    canActivate: true,
    energy: 100,
    maxEnergy: 100,
    energyRechargeRate: 5, // per second
    energyConsumptionRate: 20, // per second
    isCooldown: false,
    cooldownProgress: 0,
    ftlCharge: 0,
    ftlChargeRate: 0.5, // per second
    ftlDischargeRate: 2, // per second
    ftlThreshold: 80, // % of max energy required for FTL
    isFTLReady: false,
    visualEffects: {
      distortion: 0,
      chromaticAberration: 0,
      motionBlur: 0,
      glowIntensity: 0.3,
    },
  });

  const chargingTimeoutRef = useRef<number | null>(null);
  const jumpTimeoutRef = useRef<number | null>(null);
  const resetTimeoutRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Constants
  const CHARGE_DURATION = 1500; // ms - Increased for more dramatic charge-up
  const JUMP_DURATION = 1000; // ms - Smoother jump animation
  const RESET_DURATION = 1200; // ms - Smoother reset
  const COOLDOWN_DURATION = 3000; // ms - Cooldown between jumps

  const clearAllTimeouts = useCallback(() => {
    if (chargingTimeoutRef.current) clearTimeout(chargingTimeoutRef.current);
    if (jumpTimeoutRef.current) clearTimeout(jumpTimeoutRef.current);
    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
  }, []);

  // Update energy and FTL charge
  const updateEnergy = useCallback((deltaTime: number) => {
    setTurboState(prev => {
      if (prev.isCharging || prev.isJumping) {
        // Consume energy while charging or jumping
        const energyConsumed = prev.energyConsumptionRate * (deltaTime / 1000);
        const newEnergy = Math.max(0, prev.energy - energyConsumed);
        
        // If charging, increase FTL charge
        let newFtlCharge = prev.ftlCharge;
        if (prev.isCharging) {
          newFtlCharge = Math.min(100, prev.ftlCharge + (prev.ftlChargeRate * (deltaTime / 1000) * 100));
        }
        
        return {
          ...prev,
          energy: newEnergy,
          ftlCharge: newFtlCharge,
          isFTLReady: newFtlCharge >= 100 && newEnergy >= prev.ftlThreshold,
        };
      } else if (!prev.isResetting) {
        // Recharge energy when not in use
        const newEnergy = Math.min(
          prev.maxEnergy,
          prev.energy + (prev.energyRechargeRate * (deltaTime / 1000))
        );
        
        // Gradually discharge FTL charge when not in use
        const newFtlCharge = Math.max(0, prev.ftlCharge - (prev.ftlDischargeRate * (deltaTime / 1000) * 100));
        
        return {
          ...prev,
          energy: newEnergy,
          ftlCharge: newFtlCharge,
          isFTLReady: newFtlCharge >= 100 && newEnergy >= prev.ftlThreshold,
        };
      }
      return prev;
    });
  }, []);
  
  // Update visual effects based on state
  const updateVisualEffects = useCallback((deltaTime: number) => {
    setTurboState(prev => {
      const baseEffects = {
        distortion: 0,
        chromaticAberration: 0,
        motionBlur: 0,
        glowIntensity: 0.3, // Base glow
      };

      if (prev.isCharging) {
        const chargeProgress = prev.progress;
        return {
          ...prev,
          visualEffects: {
            ...baseEffects,
            distortion: chargeProgress * 2,
            chromaticAberration: chargeProgress * 0.5,
            glowIntensity: 0.3 + (chargeProgress * 2),
          },
        };
      } else if (prev.isJumping) {
        return {
          ...prev,
          visualEffects: {
            ...baseEffects,
            distortion: 5,
            chromaticAberration: 1,
            motionBlur: 0.8,
            glowIntensity: 3,
          },
        };
      } else if (prev.isResetting) {
        return {
          ...prev,
          visualEffects: {
            ...baseEffects,
            distortion: THREE.MathUtils.lerp(prev.visualEffects.distortion, 0, deltaTime * 2),
            chromaticAberration: THREE.MathUtils.lerp(prev.visualEffects.chromaticAberration, 0, deltaTime * 2),
            motionBlur: THREE.MathUtils.lerp(prev.visualEffects.motionBlur, 0, deltaTime * 3),
            glowIntensity: THREE.MathUtils.lerp(prev.visualEffects.glowIntensity, 0.3, deltaTime * 2),
          },
        };
      }
      return prev;
    });
  }, []);

  // Animation loop for continuous updates
  useEffect(() => {
    let lastTime = performance.now();
    
    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;
      
      updateEnergy(deltaTime);
      updateVisualEffects(deltaTime);
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateEnergy, updateVisualEffects]);

  const startCharging = useCallback(() => {
    if (!turboState.canActivate || turboState.energy < turboState.ftlThreshold) {
      // Not enough energy to start charging
      return;
    }

    clearAllTimeouts();
    startTimeRef.current = Date.now();

    setTurboState(prev => ({
      ...prev,
      isCharging: true,
      isJumping: false,
      isResetting: false,
      progress: 0,
      canActivate: false,
      isCooldown: false,
      cooldownProgress: 0,
    }));

    // Update progress during charging
    progressIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / CHARGE_DURATION, 1);
      
      setTurboState(prev => ({
        ...prev,
        progress,
        isFTLReady: progress >= 0.8 && prev.energy >= prev.ftlThreshold,
      }));

      if (progress >= 1) {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
        // If fully charged but not enough energy, abort
        if (turboState.energy < turboState.ftlThreshold) {
          setTurboState(prev => ({
            ...prev,
            isCharging: false,
            isResetting: true,
          }));
          startReset();
          return;
        }
      }
    }, 16); // ~60fps updates

    // Auto-jump when charging completes
    chargingTimeoutRef.current = window.setTimeout(() => {
      if (turboState.energy >= turboState.ftlThreshold) {
        initiateJump();
      } else {
        // Not enough energy, abort jump
        setTurboState(prev => ({
          ...prev,
          isCharging: false,
          isResetting: true,
        }));
        startReset();
      }
    }, CHARGE_DURATION);
  }, [turboState.canActivate, turboState.energy, turboState.ftlThreshold]);

  const initiateJump = useCallback(() => {
    clearAllTimeouts();

    // If not enough energy for FTL, don't jump
    if (turboState.energy < turboState.ftlThreshold) {
      setTurboState(prev => ({
        ...prev,
        isCharging: false,
        isJumping: false,
        isResetting: true,
        progress: 0,
      }));
      startReset();
      return;
    }

    setTurboState(prev => ({
      ...prev,
      isCharging: false,
      isJumping: true,
      isResetting: false,
      progress: 1,
      ftlCharge: 0, // Reset FTL charge after jump
    }));

    // Start reset after jump duration
    jumpTimeoutRef.current = window.setTimeout(() => {
      startReset();
    }, JUMP_DURATION);
  }, [turboState.energy, turboState.ftlThreshold]);

  const startReset = useCallback(() => {
    clearAllTimeouts();

    setTurboState(prev => ({
      ...prev,
      isJumping: false,
      isResetting: true,
      isCooldown: true,
      cooldownProgress: 0,
    }));

    // Start cooldown period
    const cooldownStartTime = Date.now();
    const cooldownInterval = window.setInterval(() => {
      const elapsed = Date.now() - cooldownStartTime;
      const progress = Math.min(elapsed / COOLDOWN_DURATION, 1);
      
      setTurboState(prev => ({
        ...prev,
        cooldownProgress: progress,
      }));
      
      if (progress >= 1) {
        clearInterval(cooldownInterval);
      }
    }, 16);

    // Complete reset and allow new activation
    resetTimeoutRef.current = window.setTimeout(() => {
      setTurboState(prev => ({
        ...prev,
        isCharging: false,
        isJumping: false,
        isResetting: false,
        progress: 0,
        canActivate: true,
        isCooldown: true, // Still in cooldown, but reset is complete
      }));
      
      // Final cooldown completion
      const cooldownEnd = window.setTimeout(() => {
        setTurboState(prev => ({
          ...prev,
          isCooldown: false,
          cooldownProgress: 1,
        }));
      }, COOLDOWN_DURATION);
      
      return () => clearTimeout(cooldownEnd);
    }, RESET_DURATION);
  }, []);

  const cancelCharging = useCallback(() => {
    if (!turboState.isCharging) return;

    clearAllTimeouts();
    setTurboState(prev => ({
      ...prev,
      isCharging: false,
      isJumping: false,
      isResetting: false,
      progress: 0,
      canActivate: true,
    }));
  }, [turboState.isCharging]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllTimeouts();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [clearAllTimeouts]);

  // Check if we can activate FTL (enough energy and not in cooldown)
  const canActivateFTL = turboState.energy >= turboState.ftlThreshold && 
                        !turboState.isCooldown && 
                        !turboState.isCharging && 
                        !turboState.isJumping && 
                        !turboState.isResetting;

  return {
    ...turboState,
    startCharging,
    cancelCharging,
    canActivateFTL,
    // Add utility functions for UI
    getEnergyPercentage: () => (turboState.energy / turboState.maxEnergy) * 100,
    getFtlChargePercentage: () => turboState.ftlCharge,
    isEnergyCritical: turboState.energy < (turboState.ftlThreshold / 2),
  };
};
