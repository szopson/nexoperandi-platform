// apps/website/src/components/ai-business-analyst-demo.tsx

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Download, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AnalysisResult {
  success: boolean;
  data?: {
    companyName: string;
    generatedAt: string;
    document: string;
    summary: {
      automationReadiness: string;
      recommendedAgents: number;
      estimatedROI: string;
      paybackPeriod: string;
    };
  };
  error?: string;
  message?: string;
}

export function AIBusinessAnalystDemo() {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    employeeCount: '',
    revenueRange: '',
    challenges: '',
    goals: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    
    try {
      // Replace with your actual n8n webhook URL
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://your-n8n-instance.com/webhook/business-analysis';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: 'Failed to analyze business. Please try again.',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const downloadReport = () => {
    if (!result?.data?.document) return;
    
    const blob = new Blob([result.data.document], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.data.companyName}-automation-roadmap-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Form Section */}
      <Card>
        <CardHeader>
          <CardTitle>AI Business Analyst Agent</CardTitle>
          <CardDescription>
            Get a customized AI automation roadmap with ROI projections in seconds
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name *</label>
                <Input
                  required
                  placeholder="Acme Corp"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Industry *</label>
                <Select
                  required
                  value={formData.industry}
                  onValueChange={(value) => setFormData({ ...formData, industry: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                    <SelectItem value="SaaS">SaaS</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Financial Services">Financial Services</SelectItem>
                    <SelectItem value="Professional Services">Professional Services</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Employee Count *</label>
                <Input
                  required
                  type="number"
                  placeholder="50"
                  value={formData.employeeCount}
                  onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Annual Revenue Range *</label>
                <Select
                  required
                  value={formData.revenueRange}
                  onValueChange={(value) => setFormData({ ...formData, revenueRange: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<$1M">Less than $1M</SelectItem>
                    <SelectItem value="$1M-$5M">$1M - $5M</SelectItem>
                    <SelectItem value="$5M-$10M">$5M - $10M</SelectItem>
                    <SelectItem value="$10M-$50M">$10M - $50M</SelectItem>
                    <SelectItem value="$50M+">$50M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Business Challenges *</label>
              <Textarea
                required
                placeholder="e.g., High customer service costs, slow response times, manual data entry, lead qualification bottlenecks..."
                rows={4}
                value={formData.challenges}
                onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Business Goals *</label>
              <Textarea
                required
                placeholder="e.g., Reduce operational costs by 30%, improve customer satisfaction, scale without adding headcount..."
                rows={4}
                value={formData.goals}
                onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
              />
            </div>
            
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Your Business...
                </>
              ) : (
                'Generate AI Automation Roadmap'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          {result.success && result.data ? (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Automation Readiness</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold capitalize">
                      {result.data.summary.automationReadiness}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Recommended Agents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {result.data.summary.recommendedAgents}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Estimated ROI</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {result.data.summary.estimatedROI}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Payback Period</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {result.data.summary.paybackPeriod}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Success Alert */}
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  Analysis complete! Your customized automation roadmap is ready.
                </AlertDescription>
              </Alert>
              
              {/* Full Report */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Your Automation Roadmap</CardTitle>
                      <CardDescription>
                        Generated on {result.data.generatedAt}
                      </CardDescription>
                    </div>
                    <Button onClick={downloadReport} variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown>{result.data.document}</ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
              
              {/* CTA */}
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold">Ready to Transform Your Business?</h3>
                    <p className="text-lg">
                      Book a free consultation to discuss your automation roadmap with our experts.
                    </p>
                    <Button size="lg" variant="secondary">
                      Schedule Free Consultation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Alert variant="destructive">
              <AlertDescription>
                {result.error || result.message || 'An error occurred during analysis.'}
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
}
