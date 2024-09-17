import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  const requestData = await req.json()
  console.log('API Request Data:', JSON.stringify(requestData, null, 2))

  const { 
    prompt, 
    hf_lora, 
    image, 
    num_outputs, 
    aspect_ratio,
    guidance_scale,
    prompt_strength,
    num_inference_steps,
    lora_scale,
    disable_safety_checker,
    seed // Add this line
  } = requestData

  const input: any = {
    prompt,
    num_outputs: num_outputs || 1,
    guidance_scale: guidance_scale || 2.8,
    num_inference_steps: num_inference_steps || 28,
    seed: seed !== null ? seed : Math.floor(Math.random() * 1000000), // Use provided seed or generate random
    aspect_ratio: aspect_ratio || "1:1",
    output_format: "png",
    lora_scale: lora_scale || 0.6,
    disable_safety_checker: disable_safety_checker || false,
  }

  if (hf_lora && hf_lora.trim() !== '') {
    input.hf_lora = hf_lora
  }

  if (image && image.trim() !== '') {
    input.image = image
    input.prompt_strength = prompt_strength || 0.8
  }

  console.log('Replicate API Input:', JSON.stringify(input, null, 2))

  try {
    const output = await replicate.run(
      "lucataco/flux-dev-lora:613a21a57e8545532d2f4016a7c3cfa3c7c63fded03001c2e69183d557a929db",
      { input }
    ) as string[]

    console.log('Replicate API Output:', JSON.stringify(output, null, 2))

    if (!Array.isArray(output) || output.length === 0) {
      throw new Error('Unexpected output format from Replicate API')
    }

    return NextResponse.json({ imageUrls: output })
  } catch (error) {
    console.error("Error details:", error);
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
  }
}