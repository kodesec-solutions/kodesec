import type { OwaspTopic } from "@/lib/content/schemas";
import { MotionArt } from "./MotionArt";
import { THEMES, type Theme } from "./sims/kit";

/** The lesson's themed explainer: the motion film when there is one, otherwise the looping motion art. Video only, no text. */
export function ExplainerVideo({ topic, theme }: { topic: OwaspTopic; theme: Theme }) {
  const film = topic.simulation.film;
  return (
    <div className="card overflow-hidden" style={{ "--acc": THEMES[theme] } as React.CSSProperties}>
      <div className="relative aspect-[16/10] md:aspect-[16/8]">
        {film ? (
          <video className="absolute inset-0 h-full w-full bg-black object-cover" src={film.src} poster={film.poster} muted loop autoPlay playsInline controls preload="metadata" />
        ) : (
          <MotionArt slug={topic.slug} />
        )}
      </div>
    </div>
  );
}
