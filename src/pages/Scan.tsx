
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Camera, 
  FileText, 
  Check, 
  AlertCircle,
  Eye,
  Download,
  Scan as ScanIcon
} from "lucide-react";
import Navigation from '@/components/Navigation';
import { useToast } from "@/hooks/use-toast";

const Scan = () => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const mockScanResult = {
    confidence: 95,
    extractedData: {
      policyNumber: "AUTO-2024-12345",
      policyHolderName: "John Michael Smith",
      insuranceCompany: "SafeDrive Insurance Co.",
      policyType: "Auto Insurance - Comprehensive",
      premiumAmount: "$1,250.00",
      policyStartDate: "2024-01-15",
      policyEndDate: "2025-01-15",
      vehicleDetails: {
        make: "Toyota",
        model: "Camry",
        year: "2022",
        vin: "1234567890ABCDEFG",
        registration: "ABC-1234"
      },
      coverage: {
        liability: "$100,000",
        collision: "$50,000",
        comprehensive: "$50,000"
      },
      agentInfo: {
        name: "Sarah Johnson",
        phone: "(555) 123-4567",
        email: "sarah.j@safedrive.com"
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast({
        title: "File uploaded successfully",
        description: `${file.name} is ready for scanning`,
      });
    }
  };

  const handleScan = async () => {
    if (!uploadedFile) {
      toast({
        title: "No file selected",
        description: "Please upload a policy document first",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    
    // Simulate OCR processing
    setTimeout(() => {
      setScanResult(mockScanResult);
      setIsScanning(false);
      toast({
        title: "Document scanned successfully",
        description: "Policy information extracted with 95% confidence",
      });
    }, 3000);
  };

  const handleSave = () => {
    toast({
      title: "Policy saved successfully",
      description: "Policy information has been added to the database",
    });
    setScanResult(null);
    setUploadedFile(null);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-100 text-green-800 border-green-200';
    if (confidence >= 70) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="lg:pl-64 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Scanner</h1>
          <p className="text-gray-600">Upload and extract information from policy documents using OCR technology</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Document
                </CardTitle>
                <CardDescription>
                  Supported formats: PDF, JPG, PNG. Maximum file size: 10MB
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <div className="flex flex-col items-center space-y-4">
                    <FileText className="h-12 w-12 text-gray-400" />
                    <div>
                      <p className="text-lg font-medium text-gray-900">Drop your file here</p>
                      <p className="text-sm text-gray-500">or click to browse</p>
                    </div>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <Button variant="outline" className="mt-2">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </Label>
                  </div>
                </div>

                {uploadedFile && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-900">{uploadedFile.name}</p>
                          <p className="text-sm text-blue-600">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Ready</Badge>
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button 
                    onClick={handleScan}
                    disabled={!uploadedFile || isScanning}
                    className="flex-1"
                  >
                    {isScanning ? (
                      <>
                        <ScanIcon className="h-4 w-4 mr-2 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <ScanIcon className="h-4 w-4 mr-2" />
                        Start OCR Scan
                      </>
                    )}
                  </Button>
                  <Button variant="outline">
                    <Camera className="h-4 w-4 mr-2" />
                    Use Camera
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Processing Status */}
            {isScanning && (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <ScanIcon className="h-8 w-8 text-blue-600 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Processing Document</h3>
                      <p className="text-gray-600">Extracting text and policy information...</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {scanResult && (
              <>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-600" />
                        Extraction Results
                      </CardTitle>
                      <Badge className={getConfidenceColor(scanResult.confidence)}>
                        {scanResult.confidence}% Confidence
                      </Badge>
                    </div>
                    <CardDescription>
                      Review and verify the extracted information before saving
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Basic Policy Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Policy Number</Label>
                        <Input value={scanResult.extractedData.policyNumber} />
                      </div>
                      <div>
                        <Label>Policy Type</Label>
                        <Input value={scanResult.extractedData.policyType} />
                      </div>
                    </div>

                    <div>
                      <Label>Policy Holder Name</Label>
                      <Input value={scanResult.extractedData.policyHolderName} />
                    </div>

                    <div>
                      <Label>Insurance Company</Label>
                      <Input value={scanResult.extractedData.insuranceCompany} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Start Date</Label>
                        <Input value={scanResult.extractedData.policyStartDate} type="date" />
                      </div>
                      <div>
                        <Label>End Date</Label>
                        <Input value={scanResult.extractedData.policyEndDate} type="date" />
                      </div>
                    </div>

                    <div>
                      <Label>Premium Amount</Label>
                      <Input value={scanResult.extractedData.premiumAmount} />
                    </div>
                  </CardContent>
                </Card>

                {/* Vehicle Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Vehicle Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Make</Label>
                        <Input value={scanResult.extractedData.vehicleDetails.make} />
                      </div>
                      <div>
                        <Label>Model</Label>
                        <Input value={scanResult.extractedData.vehicleDetails.model} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Year</Label>
                        <Input value={scanResult.extractedData.vehicleDetails.year} />
                      </div>
                      <div>
                        <Label>Registration</Label>
                        <Input value={scanResult.extractedData.vehicleDetails.registration} />
                      </div>
                    </div>
                    <div>
                      <Label>VIN</Label>
                      <Input value={scanResult.extractedData.vehicleDetails.vin} />
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex space-x-4">
                  <Button onClick={handleSave} className="flex-1">
                    <Check className="h-4 w-4 mr-2" />
                    Save Policy
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </>
            )}

            {!scanResult && !isScanning && (
              <Card>
                <CardContent className="p-12 text-center">
                  <ScanIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Document Scanned</h3>
                  <p className="text-gray-500">Upload a document and click scan to extract policy information</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scan;
