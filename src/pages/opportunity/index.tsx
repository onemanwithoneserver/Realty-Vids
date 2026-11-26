import React, { useEffect, useMemo, useRef, useState } from "react";
import { IMAGES, Icon, DetailHeader } from "../../AppShared";

function OpportunityDetail({
  saved,
  toggle,
  onBack,
  onEnquire,
}: {
  saved: Set<string>;
  toggle: (id: string) => void;
  onBack: () => void;
  onEnquire: () => void;
}) {
  return (
    <section className="detail-page opportunity-detail">
      <DetailHeader label="VERIFIED OPPORTUNITY" onBack={onBack} />
      <div className="opportunity-hero">
        <div>
          <div className="verified">
            <Icon name="check" size={13} /> REALTY VIDS VERIFIED
          </div>
          <span className="project-place">LIMITED INVENTORY · LOWER PAREL</span>
          <h1>Parkside Residences</h1>
          <p>
            A ready-to-move residence priced below recent registrations in the same micro-market.
          </p>
          <div className="validity">
            <Icon name="clock" /> Valid for 6 more days <span>2 residences left</span>
          </div>
        </div>
        <div className="saving-block">
          <span>YOUR ADVANTAGE</span>
          <strong>₹80L</strong>
          <small>12% below area benchmark</small>
        </div>
      </div>
      <div className="opportunity-body">
        <div>
          <img
            className="opportunity-image"
            src={IMAGES.interior}
            alt="Parkside apartment interior"
          />
          <div className="evidence-grid">
            <article>
              <span>OPPORTUNITY PRICE</span>
              <strong>₹5.95 Cr</strong>
              <small>3 BHK · 1,462 sq ft carpet</small>
            </article>
            <article>
              <span>AREA BENCHMARK</span>
              <strong>₹6.75 Cr</strong>
              <small>Based on 8 registered sales</small>
            </article>
            <article>
              <span>EFFECTIVE RATE</span>
              <strong>₹40,697 / sq ft</strong>
              <small>All-inclusive before taxes</small>
            </article>
          </div>
          <div className="verification-copy">
            <span className="project-place">HOW WE VERIFIED IT</span>
            <h2>Evidence, not promotion.</h2>
            <p>
              Our review compares the offered consideration with registered transactions, current
              developer inventory and unit-level attributes. Paid placement never influences
              verification.
            </p>
            <div>
              {[
                "Title and RERA checked",
                "Price confirmed 14 Nov 2026",
                "Comparable sales reviewed",
                "No paid verification",
              ].map((x) => (
                <span key={x}>
                  <Icon name="check" size={15} />
                  {x}
                </span>
              ))}
            </div>
          </div>
        </div>
        <aside className="context-panel">
          <span className="project-place">RESERVE YOUR INTEREST</span>
          <h3>See the full opportunity</h3>
          <p>Speak with an advisor for unit details, the comparison report and viewing slots.</p>
          <button className="primary-button" onClick={onEnquire}>
            Request details
          </button>
          <button className="secondary-button" onClick={() => toggle("deal1")}>
            <Icon name={saved.has("deal1") ? "check" : "bookmark"} size={17} />
            {saved.has("deal1") ? "Opportunity saved" : "Save opportunity"}
          </button>
          <small className="privacy-note">
            No spam. Your enquiry remains linked to this opportunity.
          </small>
        </aside>
      </div>
    </section>
  );
}

export default OpportunityDetail;
