'use client';

import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Loader2 } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Slider } from "./ui/slider"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { Progress } from "./ui/progress"
import { motion } from 'framer-motion'

interface ImageGeneratorProps {
  setGeneratedImages: React.Dispatch<React.SetStateAction<string[]>>;
  setOutputFormat: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ImageGenerator({ setGeneratedImages, setOutputFormat, setIsLoading }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState('')
  const [aspectRatio, setAspectRatio] = useState('1:1')
  const [imageUrl, setImageUrl] = useState('')
  const [promptStrength, setPromptStrength] = useState(0.8)
  const [numOutputs, setNumOutputs] = useState(1)
  const [hfLora, setHfLora] = useState('')
  const [loraScale, setLoraScale] = useState(0.6)
  const [guidanceScale, setGuidanceScale] = useState(3.5)
  const [numInferenceSteps, setNumInferenceSteps] = useState(28)
  const [disableSafetyChecker, setDisableSafetyChecker] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedImages, setGeneratedImagesState] = useState<string[]>([])
  const [outputFormat, setOutputFormatState] = useState('png')
  const [progress, setProgress] = useState(0)
  const [seed, setSeed] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setProgress(0)

    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => Math.min(prevProgress + 10, 90))
    }, 500)

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          hf_lora: hfLora,
          image: imageUrl,
          num_outputs: numOutputs,
          aspect_ratio: aspectRatio,
          guidance_scale: guidanceScale,
          prompt_strength: promptStrength,
          num_inference_steps: numInferenceSteps,
          lora_scale: loraScale,
          disable_safety_checker: disableSafetyChecker,
          output_format: outputFormat,
          seed: seed
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (data.imageUrls) {
        setGeneratedImages(data.imageUrls);
        setGeneratedImagesState(data.imageUrls);
      }
      if (data.error) {
        setError(data.error)
      }
    } catch (error) {
      setError('An error occurred while generating the image: ' + (error as Error).message)
    } finally {
      setIsLoading(false)
      clearInterval(progressInterval)
      setProgress(100)
      setTimeout(() => setProgress(0), 1000)
    }
  }

  const handleClear = () => {
    setPrompt('')
    setImageUrl('')
    setGeneratedImagesState([])
    setGeneratedImages([])
    setError(null)
    setSeed(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Generate Image</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="prompt">Prompt</Label>
              <Input
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                className="mt-1 bg-gray-700 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="aspectRatio">Aspect Ratio</Label>
                <Select value={aspectRatio} onValueChange={setAspectRatio}>
                  <SelectTrigger id="aspectRatio" className="mt-1 bg-gray-700 text-white">
                    <SelectValue placeholder="Select aspect ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1:1">1:1</SelectItem>
                    <SelectItem value="16:9">16:9</SelectItem>
                    <SelectItem value="4:3">4:3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="numOutputs">Number of Outputs: {numOutputs}</Label>
                <Slider
                  id="numOutputs"
                  min={1}
                  max={4}
                  step={1}
                  value={[numOutputs]}
                  onValueChange={([value]) => setNumOutputs(value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="imageUrl">Image URL (optional)</Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL for image-to-image"
                className="mt-1 bg-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="hfLora">HF LoRA (optional)</Label>
              <Input
                id="hfLora"
                value={hfLora}
                onChange={(e) => setHfLora(e.target.value)}
                placeholder="Enter HF, Replicate, CivitAI, or URL to a LoRA"
                className="mt-1 bg-gray-700 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="promptStrength">Prompt Strength: {promptStrength.toFixed(2)}</Label>
                <Slider
                  id="promptStrength"
                  min={0}
                  max={1}
                  step={0.01}
                  value={[promptStrength]}
                  onValueChange={([value]) => setPromptStrength(value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="loraScale">LoRA Scale: {loraScale.toFixed(2)}</Label>
                <Slider
                  id="loraScale"
                  min={0}
                  max={1}
                  step={0.01}
                  value={[loraScale]}
                  onValueChange={([value]) => setLoraScale(value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="guidanceScale">Guidance Scale: {guidanceScale.toFixed(2)}</Label>
                <Slider
                  id="guidanceScale"
                  min={0}
                  max={10}
                  step={0.1}
                  value={[guidanceScale]}
                  onValueChange={([value]) => setGuidanceScale(value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="numInferenceSteps">Inference Steps: {numInferenceSteps}</Label>
                <Slider
                  id="numInferenceSteps"
                  min={1}
                  max={50}
                  step={1}
                  value={[numInferenceSteps]}
                  onValueChange={([value]) => setNumInferenceSteps(value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="seed">Seed (optional)</Label>
              <Input
                id="seed"
                type="number"
                value={seed === null ? '' : seed}
                onChange={(e) => setSeed(e.target.value ? parseInt(e.target.value) : null)}
                placeholder="Enter seed for reproducible generation"
                className="mt-1 bg-gray-700 text-white"
              />
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <Switch
                id="disableSafetyChecker"
                checked={disableSafetyChecker}
                onCheckedChange={setDisableSafetyChecker}
              />
              <Label htmlFor="disableSafetyChecker">Disable Safety Checker</Label>
            </div>

            {progress > 0 && <Progress value={progress} className="mt-4" />}
            
            <div className="flex space-x-4 mt-4">
              <Button type="submit" className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all" disabled={progress > 0 && progress < 100}>
                {progress > 0 && progress < 100 ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {progress > 0 && progress < 100 ? 'Generating...' : 'Generate'}
              </Button>
              <Button type="button" onClick={handleClear} className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all">
                Clear
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}