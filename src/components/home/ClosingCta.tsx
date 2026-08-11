import { Button } from "@/components/ui/Button";
import { TOTAL_LISTINGS } from "@/lib/site";

export function ClosingCta() {
  return (
    <section className="px-4 py-14 text-center md:px-6 md:py-16">
      <h2 className="mx-auto max-w-[20ch] text-section md:text-[2.1rem] md:leading-[1.12]">
        Prêt à organiser votre séjour&nbsp;?
      </h2>
      <p className="mx-auto mt-3 max-w-[46ch] text-ink-muted">
        Choisissez un lieu, envoyez une demande, le prestataire vous répond
        directement. Sans intermédiaire et sans frais.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button href="/explorer" variant="primary" size="lg">
          Explorer les {TOTAL_LISTINGS} lieux
        </Button>
        <Button href="/contact" variant="secondary" size="lg">
          Nous contacter
        </Button>
      </div>
    </section>
  );
}
