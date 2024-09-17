# Use this guide to design the UI for the Juicyflux app

Take reference from the following website: https://replicate.com

Input schema
seedinteger

Random seed. Set for reproducible generation
imageuri

Input image for image to image mode. The aspect ratio of your output will match this image
promptstring

Prompt for generated image
hf_lorastring

HF, Replicate, CivitAI, or URL to a LoRA. Ex: Mugiwara93/myhoor1
lora_scalenumber

Scale for the LoRA weights
num_outputsinteger

Number of images to output.
aspect_ratiostring

Aspect ratio for the generated image
output_formatstring

Format of the output images
guidance_scalenumber

Guidance scale for the diffusion process
output_qualityinteger

Quality when saving the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. Not relevant for .png outputs
prompt_strengthnumber

Prompt strength (or denoising strength) when using image to image. 1.0 corresponds to full destruction of information in image.
num_inference_stepsinteger

Number of inference steps
disable_safety_checkerboolean

Disable safety checker for generated images. This feature is only available through the API. See [https://replicate.com/docs/how-does-replicate-work#safety](https://replicate.com/docs/how-does-replicate-work#safety)
Output schema

Type
    uri[]

# Design

## Layout
1. Create a responsive layout with a centered content area.
2. Use @background.png as the full-screen background image for the app.
3. Implement a header with the app logo and name "JuicyFlux" on the left, and user authentication controls on the right.

## Image Generator Component
4. Create a card-like container for the image generation form.
5. Include the following form elements:
   - Text input for the prompt
   - Dropdown for aspect ratio selection (1:1, 16:9, 4:3)
   - Slider for prompt strength (0 to 1)
   - Slider for number of outputs (1 to 4)
   - Optional image URL input for image-to-image generation
   - Generate button

## Generated Images Display
6. Below the form, create a grid to display generated images.
7. Each image should be in a card-like container.
8. Implement hover effects to show the prompt used for generation.
9. Add download and like buttons for each image.

## Image Grid Component
10. Create a separate section for displaying all previously generated images.
11. Implement a masonry-style grid layout for the images.
12. Add infinite scrolling or pagination for loading more images.

## Styling
13. Use a dark color scheme with accents of vibrant colors.
14. Implement smooth transitions and hover effects for interactive elements.
15. Ensure all text is legible against the background image.

## Responsive Design
16. Ensure the layout adapts well to different screen sizes.
17. On mobile devices, stack the image generator and image grid vertically.

Refer to @mockup1.png and @mockup2.png for visual guidance on the overall layout and component designs.