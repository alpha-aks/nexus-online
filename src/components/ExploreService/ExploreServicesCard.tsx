import { motion } from "framer-motion";

type ExploreServicesCardProps = {
  id: string;
  imgUrl: string;
  title: string;
  index: number;
  active: string;
  handleClick: (id: string) => void;
};

export default function ExploreServicesCard({
  id,
  imgUrl,
  title,
  index,
  active,
  handleClick,
}: ExploreServicesCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`relative ${
        active === id ? "lg:flex-[3.5] flex-[10]" : "lg:flex-[0.5] flex-[2]"
      } flex items-center justify-center min-w-[170px] h-[700px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer overflow-hidden rounded-[24px] border border-white/10`}
      onClick={() => handleClick(id)}
    >
      {/* Image with lazy loading and optimization */}
      <img
        src={imgUrl}
        alt={title}
        className="absolute w-full h-full object-cover rounded-[24px]"
        loading="lazy"
        width="800"
        height="600"
        decoding="async"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black rounded-[24px]" />

      <h3
        className={`${
          active === id
            ? "translate-y-[0%] opacity-100 delay-300"
            : "translate-y-[100%] opacity-0"
        } absolute z-0 bottom-8 p-8 text-3xl font-semibold text-white transition-all duration-300`}
      >
        {title}
      </h3>
    </motion.div>
  );
}
