import React from "react";

export default function AnnouncementBar() {
  const message = "FREE SHIPPING ON ALL INTL ORDERS OVER $50";
  return (
    <div className="announcement-bar border-b border-black/10" role="region" aria-label="Promotional announcements">
      <div className="announcement-track">
        <span className="announcement-item">{message}</span>
        <span className="announcement-item">{message}</span>
        <span className="announcement-item">{message}</span>
        <span className="announcement-item">{message}</span>
        <span className="announcement-item">{message}</span>
        <span className="announcement-item">{message}</span>
      </div>
    </div>
  );
}