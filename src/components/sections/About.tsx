import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { teamRoles } from "@/content/team";

export function About() {
  return (
    <section
      id="about"
      className="section-space scroll-mt-20 border-y border-line bg-paper"
    >
      <div className="container-wide">
        <Reveal>
          <SectionLabel index="09">About us</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal delay={0.04} className="lg:col-span-8">
            <h2 className="max-w-[14ch] text-[clamp(2.45rem,5vw,5rem)] font-medium leading-[1] tracking-[-0.055em]">
              A small team. A{" "}
              <em className="serif-accent font-normal">thoughtful</em> approach.
            </h2>
          </Reveal>

          <Reveal delay={0.09} className="lg:col-span-4">
            <div className="border-t border-line pt-5">
              <div className="flex items-baseline gap-3">
                <span className="serif-accent text-[42px] leading-none text-ink">
                  04
                </span>
                <p className="text-[9px] uppercase leading-[1.6] tracking-[0.18em] text-muted">
                  people,
                  <br />
                  one point of contact
                </p>
              </div>
              <p className="mt-5 max-w-[35ch] text-[13px] leading-[1.7] text-muted">
                We are a four-person web development team focused on helping
                local businesses establish and improve their digital presence.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid border-t border-line md:grid-cols-2 md:gap-x-12">
          {teamRoles.map((role, index) => (
            <Reveal key={role.number} delay={index * 0.04}>
              <article className="group border-b border-line py-7 sm:py-8">
                <div className="grid grid-cols-[2rem_1fr] gap-4">
                  <span className="pt-1 text-[10px] font-medium tracking-[0.14em] text-muted">
                    {role.number}
                  </span>
                  <div>
                    <h3 className="text-[18px] font-medium tracking-[-0.025em] text-ink transition-colors duration-500 group-hover:text-accent sm:text-[20px]">
                      {role.title}
                    </h3>
                    <p className="mt-2.5 max-w-[40ch] text-[12.5px] leading-[1.7] text-muted">
                      {role.description}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.06}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[48ch] text-[12px] leading-[1.7] text-muted">
              A four-person team means fewer handovers, clearer conversations
              and the people who plan your website are the people who build it.
            </p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted">
              Bhimtal · Uttarakhand
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
