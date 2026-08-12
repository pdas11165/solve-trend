/**
 * designmonks guarantee pill: a white capsule under the contact panel with
 * lime gradient fades at both ends and a slow text marquee. Pure CSS
 * animation; the text is duplicated for a seamless loop.
 */
const LINE = (
  <>
    Why risk it with the <em>wrong partner</em>? Get 100% value, guaranteed.
    Don&rsquo;t miss out — secure your <em>brand&rsquo;s future</em> today.
  </>
);

export default function GuaranteeBand() {
  return (
    <aside className="guarantee-band-wrap" aria-label="Value guarantee">
      <div className="guarantee-band">
        <div className="guarantee-band__track" aria-hidden="false">
          <p className="guarantee-band__text">{LINE}</p>
          <p className="guarantee-band__text" aria-hidden="true">
            {LINE}
          </p>
        </div>
        <span className="guarantee-band__shade guarantee-band__shade--left" aria-hidden="true" />
        <span className="guarantee-band__shade guarantee-band__shade--right" aria-hidden="true" />
      </div>
    </aside>
  );
}
