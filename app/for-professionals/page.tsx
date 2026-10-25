"use client";

import React from "react";
import { AUDIENCE_DATA } from "@/content/site";
import { AudiencePageTemplate } from "@/components/AudiencePageTemplate";

export default function ForProfessionalsPage() {
  const data = AUDIENCE_DATA.professionals;

  return (
    <AudiencePageTemplate
      eyebrow={data.eyebrow}
      title={data.title}
      badges={data.badges}
      image={data.image}
      
    />
  );
}
