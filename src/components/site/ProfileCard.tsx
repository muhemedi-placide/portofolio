import { Briefcase, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { profile } from "@/content/site";
import { useLang } from "@/i18n/context";
import { translate } from "@/i18n/translations";

export function ProfileCard() {
  const { lang } = useLang();
  return (
    <div className="card-soft card-soft-hover relative overflow-hidden p-6 md:p-8">
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-brand-gold/15 blur-2xl" />
      <div className="relative">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-brand-navy font-display text-xl font-bold text-white">
            MP
          </div>
          <div className="min-w-0">
            <p className="font-display text-lg font-semibold text-brand-navy">{profile.name}</p>
            <p className="truncate text-sm text-muted-foreground">{translate(profile.title, lang)}</p>
          </div>
        </div>

        <ul className="mt-6 space-y-3 text-sm">
          {profile.education.map((e) => (
            <li key={e} className="flex items-start gap-3 text-foreground/80">
              <GraduationCap size={18} className="mt-0.5 shrink-0 text-brand-green" />
              <span>{translate(e, lang)}</span>
            </li>
          ))}
          <li className="flex items-start gap-3 text-foreground/80">
            <Briefcase size={18} className="mt-0.5 shrink-0 text-brand-green" />
            <span>{translate(profile.position, lang)}</span>
          </li>
          <li className="flex items-start gap-3 text-foreground/80">
            <MapPin size={18} className="mt-0.5 shrink-0 text-brand-green" />
            <span>{translate(profile.status, lang)}</span>
          </li>
          <li className="flex items-start gap-3 text-foreground/80">
            <Sparkles size={18} className="mt-0.5 shrink-0 text-brand-gold" />
            <span>{translate(profile.since, lang)}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
