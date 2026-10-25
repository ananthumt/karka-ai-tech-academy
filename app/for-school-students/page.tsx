"use client";

import React from "react";
import { AUDIENCE_DATA } from "@/content/site";
import { AudiencePageTemplate } from "@/components/AudiencePageTemplate";

export default function ForSchoolStudentsPage() {
  const data = AUDIENCE_DATA.school;

  return (
    <AudiencePageTemplate
      eyebrow={data.eyebrow}
      title={data.title}
      description={data.description}
      badges={data.badges}
      image={data.image}
      
    />
  );
}
