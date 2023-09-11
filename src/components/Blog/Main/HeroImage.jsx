"use client";

import React from "react";
import styled from "styled-components";
import { baseURL } from "@/utils/getBaseUrl";
import BaseCanvas from "@/components/WebGPU/canvas";

const url = `${baseURL}/bird.svg`;

export default function HeroImage() {
	return <BaseCanvas />;
}
