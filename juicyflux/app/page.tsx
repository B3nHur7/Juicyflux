'use client';

import { ImageGenerator } from '@/components/image-generator'
import { GeneratedImages } from '../components/generated-images'
import { useState } from 'react'

export default function Home() {
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [outputFormat, setOutputFormat] = useState('png')
  const [isLoading, setIsLoading] = useState(false)

  return (
    <main className="flex flex-col lg:flex-row h-screen">
      <div className="lg:w-1/2 p-4 overflow-y-auto">
        <ImageGenerator 
          setGeneratedImages={setGeneratedImages} 
          setOutputFormat={setOutputFormat}
          setIsLoading={setIsLoading}
        />
      </div>
      <div className="lg:w-1/2 p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 overflow-y-auto">
        <GeneratedImages 
          images={generatedImages} 
          outputFormat={outputFormat}
          loading={isLoading}
        />
      </div>
    </main>
  )
}
