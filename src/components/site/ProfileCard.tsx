import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { profile } from "@/content/site";
import { useLang, useT } from "@/i18n/context";
import { translate } from "@/i18n/translations";

export function ProfileCard() {
  const { lang } = useLang();
  const t = useT();
  return (
    <div className="rounded-xl border border-border bg-white p-7 md:p-8">
      <div className="flex items-center gap-4">
        <img
          src="/images/placide_muhemedi_salumu.webp"
          alt="Muhemedi Placide"
          width={72}
          height={72}
          className="h-18 w-18 shrink-0 rounded-xl object-cover object-[78%_20%]"
          loading="lazy"
        />
        <div>
          <p className="text-base font-semibold tracking-tight">{profile.name}</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {translate(profile.title, lang)}
          </p>
        </div>
      </div>
      <div className="my-6 border-t border-border" />
      <ul className="space-y-4 text-[13px] leading-6 text-muted-foreground">
        {profile.education.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <GraduationCap size={16} className="mt-1 shrink-0 text-brand-green" />
            <span>{translate(item, lang)}</span>
          </li>
        ))}
        <li className="flex items-start gap-3">
          <Briefcase size={16} className="mt-1 shrink-0 text-brand-green" />
          <span>{translate(profile.position, lang)}</span>
        </li>
        <li className="flex items-start gap-3">
          <MapPin size={16} className="mt-1 shrink-0 text-brand-green" />
          <span>{translate(profile.status, lang)}</span>
        </li>
      </ul>
      <p className="mt-6 border-t border-border pt-5 text-xs font-medium text-brand-green">
        {t("À vos côtés depuis 2018", "Working alongside you since 2018")}
      </p>
    </div>
  );
}
