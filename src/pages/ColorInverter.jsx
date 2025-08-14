import React, { useEffect } from 'react';
import { Footer } from '../components/Footer';
import { NavBar } from '../components/NavBar';
import { PageTransition } from '../components/PageTransition';
import { motion } from 'framer-motion';
import { Palette, Zap, Download, Shield, Clock, Layers } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { 
  ImageUploader,
  ProcessedImageGrid,
  useImageProcessor
} from '../components/ColorInverter';

export default function ColorInverter() {
  const { toast } = useToast();
  const {
    processedImages,
    isProcessing,
    processImages,
    downloadImage,
    downloadAllImages,
    clearImages,
    cleanup
  } = useImageProcessor();

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const handleImagesSelected = async (files) => {
    if (files.length === 0) return;
    
    toast({
      title: "Processing Images",
      description: `Starting to process ${files.length} image${files.length > 1 ? 's' : ''}...`,
    });

    try {
      const results = await processImages(files);
      
      const successCount = results.filter(img => img.processedUrl).length;
      const failCount = results.filter(img => img.error).length;

      if (successCount > 0) {
        toast({
          title: "Processing Complete",
          description: `${successCount} image${successCount > 1 ? 's' : ''} processed successfully${failCount > 0 ? `, ${failCount} failed` : ''}.`,
        });
      } else if (failCount > 0) {
        toast({
          title: "Processing Failed",
          description: `Failed to process ${failCount} image${failCount > 1 ? 's' : ''}. Please try again.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Processing error:', error);
      toast({
        title: "Processing Error",
        description: "An unexpected error occurred while processing images.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadImage = (image) => {
    downloadImage(image);
    toast({
      title: "Download Started",
      description: `Downloading ${image.name}`,
    });
  };

  const handleDownloadAll = async () => {
    await downloadAllImages();
    toast({
      title: "Download Started",
      description: "Downloading all processed images as ZIP file",
    });
  };

  const handleClearImages = () => {
    clearImages();
    toast({
      title: "Images Cleared",
      description: "All images have been removed",
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </div>

        <NavBar />

        <main className="mt-14 flex-1 container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4"
            >
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                  <Palette size={32} className="text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  Color Inverter
                </h1>
              </div>

              <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                Instantly invert the colors of your images. Perfect for converting black icons to white, 
                creating negative effects, or preparing images for different backgrounds.
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-card/80 backdrop-blur-md rounded-xl p-6 border border-border/50">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="text-primary" size={24} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Instant Processing</h3>
                <p className="text-sm text-foreground/70">
                  Fast color inversion with Web Workers for optimal performance
                </p>
              </div>

              <div className="bg-card/80 backdrop-blur-md rounded-xl p-6 border border-border/50">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="text-primary" size={24} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Preserve Transparency</h3>
                <p className="text-sm text-foreground/70">
                  PNG transparency is maintained during the color inversion process
                </p>
              </div>

              <div className="bg-card/80 backdrop-blur-md rounded-xl p-6 border border-border/50">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Layers className="text-primary" size={24} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Batch Processing</h3>
                <p className="text-sm text-foreground/70">
                  Upload and process multiple images simultaneously
                </p>
              </div>
            </motion.div>

            {/* Image Uploader */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ImageUploader
                onImagesSelected={handleImagesSelected}
                isProcessing={isProcessing}
              />
            </motion.div>

            {/* Processed Images Grid */}
            {processedImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <ProcessedImageGrid
                  images={processedImages}
                  onDownloadImage={handleDownloadImage}
                  onDownloadAll={handleDownloadAll}
                  onClear={handleClearImages}
                />
              </motion.div>
            )}

            {/* How It Works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card/50 backdrop-blur-md rounded-2xl p-8 border border-border/50"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                How It Works
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h4 className="font-semibold text-foreground">Upload Images</h4>
                  <p className="text-sm text-foreground/70">
                    Drag & drop or select PNG/JPEG files
                  </p>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h4 className="font-semibold text-foreground">Auto Process</h4>
                  <p className="text-sm text-foreground/70">
                    Colors are inverted automatically
                  </p>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h4 className="font-semibold text-foreground">Preview Results</h4>
                  <p className="text-sm text-foreground/70">
                    Compare before & after side by side
                  </p>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <h4 className="font-semibold text-foreground">Download</h4>
                  <p className="text-sm text-foreground/70">
                    Save individual or batch download
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Technical Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-muted/30 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Clock size={20} className="text-primary" />
                Technical Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Supported Formats:</h4>
                  <ul className="text-foreground/70 space-y-1">
                    <li>• PNG (with transparency preservation)</li>
                    <li>• JPEG/JPG</li>
                    <li>• Maximum file size: 10MB per image</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Processing:</h4>
                  <ul className="text-foreground/70 space-y-1">
                    <li>• Uses Web Workers for performance</li>
                    <li>• RGB inversion: (255 - R, 255 - G, 255 - B)</li>
                    <li>• Alpha channel preserved for PNG files</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Tips & Use Cases */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/10"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">
                💡 Common Use Cases
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Perfect for:</h4>
                  <ul className="text-foreground/70 space-y-1">
                    <li>• Converting black icons to white for dark themes</li>
                    <li>• Creating negative photo effects</li>
                    <li>• Preparing logos for different backgrounds</li>
                    <li>• Design mockups and prototypes</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Pro Tips:</h4>
                  <ul className="text-foreground/70 space-y-1">
                    <li>• Use PNG format to preserve transparent backgrounds</li>
                    <li>• Works best with high contrast images</li>
                    <li>• Batch process multiple icons at once</li>
                    <li>• Zoom in to check fine details</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
