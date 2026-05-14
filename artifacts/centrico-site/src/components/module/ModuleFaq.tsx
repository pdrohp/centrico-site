import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import type { ModuleContent } from "@/lib/modulesContent";

export function ModuleFaq({ content }: { content: ModuleContent }) {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container max-w-4xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="eyebrow-pill mb-6">Perguntas frequentes</span>
          <h2 className="display-title text-[#141414] text-[32px] md:text-[48px] mt-6 leading-[1.05]">
            Antes de avançar, talvez se{" "}
            <span className="font-italic-display text-[1.04em]">
              interroguem sobre
            </span>
          </h2>
        </motion.div>

        <Accordion
          type="single"
          collapsible
          className="border-t border-[#141414]/10"
        >
          {content.faq.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-b border-[#141414]/10"
            >
              <AccordionTrigger className="py-6 md:py-7 text-left text-[16px] md:text-[18px] font-medium text-[#141414] hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-[15px] md:text-base text-[#141414]/65 leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
