import React from "react";
import { motion } from "framer-motion";
import { matchWordToElements } from "../utils/periodicTable";
import emojiMap from "../utils/emojiMap";
import physicsMap from "../utils/physicsMap";

type Props = { lyrics: string };

const ElementBlock = ({ label, name, number }: { label: string; name?: string; number?: number }) => (
  <motion.div
    className="bg-white text-gray-800 rounded-2xl shadow p-3 m-1 flex flex-col items-center justify-center w-20 h-24 border border-gray-200"
    whileHover={{ scale: 1.1 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="text-2xl font-bold">{label}</div>
    {name && <div className="text-xs opacity-70">{name}</div>}
    {number && <div className="text-[10px] text-gray-400">#{number}</div>}
  </motion.div>
);

export default function LyricsDisplay({ lyrics }: Props) {
  const words = lyrics.split(/\s+/);
  return (
    <div className="flex flex-wrap gap-2 justify-center p-4">
      {words.map((word, i) => {
        const lower = word.toLowerCase().replace(/[^a-z]/g, "");
        if (emojiMap[lower])
          return <ElementBlock key={i} label={emojiMap[lower]} name={word} />;
        const matched = matchWordToElements(word);
        if (matched)
          return (
            <div key={i} className="flex flex-row">
              {matched.map((el, j) => (
                <ElementBlock key={j} label={el.symbol} name={el.name} number={el.number} />
              ))}
            </div>
          );
        return (
          <div key={i} className="flex flex-row">
            {word.split("").map((ch, j) => (
              <ElementBlock key={j} label={physicsMap[ch.toUpperCase()] || ch} />
            ))}
          </div>
        );
      })}
    </div>
  );
}