"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Mail, Sparkles, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react"

interface MeetingSlot {
  rank: number
  date: string
  time: string
  displayTime: string
  dayName: string
  displayDate: string
  timezone: string
  reason: string
}

interface FollowUpEmail {
  subject: string
  body: string
  tone: string
}

interface MeetingDetails {
  title: string
  agenda: string[]
  preparationTips: string[]
}

interface ROIPreview {
  timesSaved: string
  automationRate: string
  followUpRate: string
  estimatedValue: string
}

interface AnalysisResult {
  success: boolean
  message: string
  data?: {
    contact: {
      name: string
      email: string
      company: string
    }
    recommendedSlots: MeetingSlot[]
    followUpEmail: FollowUpEmail
    meetingDetails: MeetingDetails
    roiPreview: ROIPreview
    insights: string[]
    generatedAt: string
  }
  meta?: {
    agentType: string
    timeSaved: string
    nextSteps: string[]
  }
}

export function SalesMeetingSchedulerDemo() {
  const [formData, setFormData] = useState({
    contactName: "",
    contactEmail: "",
    companyName: "",
    meetingPurpose: "Discovery Call",
    preferredTime: "morning",
    durationMinutes: 30,
    notes: ""
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL + "/meeting-scheduler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze meeting request")
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      contactName: "",
      contactEmail: "",
      companyName: "",
      meetingPurpose: "Discovery Call",
      preferredTime: "morning",
      durationMinutes: 30,
      notes: ""
    })
    setResult(null)
    setError(null)
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <Badge variant="secondary" className="mb-2">
          <Sparkles className="w-3 h-3 mr-1" />
          AI-Powered Demo
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          Sales Meeting Scheduler & Follow-up Agent
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          See how AI saves 11+ hours per week per sales rep by automating meeting scheduling and follow-ups
        </p>
        
        {/* ROI Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-3xl font-bold">95%</div>
                <p className="text-sm text-muted-foreground">Time Reduction</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-3xl font-bold">100%</div>
                <p className="text-sm text-muted-foreground">Follow-up Rate</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-3xl font-bold">30 sec</div>
                <p className="text-sm text-muted-foreground">Booking Time</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Request a Meeting</CardTitle>
            <CardDescription>
              Fill in your details and watch AI generate personalized scheduling options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Your Name *</Label>
                <Input
                  id="contactName"
                  placeholder="John Smith"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName">Company</Label>
                <Input
                  id="companyName"
                  placeholder="Acme Corp"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meetingPurpose">Meeting Purpose</Label>
                <Select
                  value={formData.meetingPurpose}
                  onValueChange={(value) => setFormData({ ...formData, meetingPurpose: value })}
                >
                  <SelectTrigger id="meetingPurpose">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Discovery Call">Discovery Call</SelectItem>
                    <SelectItem value="Product Demo">Product Demo</SelectItem>
                    <SelectItem value="Technical Discussion">Technical Discussion</SelectItem>
                    <SelectItem value="Proposal Review">Proposal Review</SelectItem>
                    <SelectItem value="Follow-up Meeting">Follow-up Meeting</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredTime">Preferred Time</Label>
                  <Select
                    value={formData.preferredTime}
                    onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}
                  >
                    <SelectTrigger id="preferredTime">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (9-12)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (1-4)</SelectItem>
                      <SelectItem value="evening">Evening (4-6)</SelectItem>
                      <SelectItem value="any">Any Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select
                    value={formData.durationMinutes.toString()}
                    onValueChange={(value) => setFormData({ ...formData, durationMinutes: parseInt(value) })}
                  >
                    <SelectTrigger id="duration">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any specific topics or questions you'd like to discuss?"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Generate Schedule
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>

              {result && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleReset}
                >
                  Try Another Request
                </Button>
              )}
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Display */}
        {result?.data && (
          <div className="space-y-4">
            {/* Recommended Meeting Times */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Top 3 Recommended Times
                </CardTitle>
                <CardDescription>
                  AI-optimized for highest engagement and convenience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.data.recommendedSlots.map((slot) => (
                  <div
                    key={slot.rank}
                    className="p-4 border rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          #{slot.rank} Best Option
                        </Badge>
                        <div className="font-semibold">{slot.displayDate}</div>
                        <div className="text-sm text-muted-foreground">
                          {slot.displayTime} ({slot.timezone})
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          {slot.reason}
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Select
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Follow-up Email Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Automated Follow-up Email
                </CardTitle>
                <CardDescription>
                  Personalized and ready to send
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Subject</Label>
                  <div className="mt-1 p-3 bg-gray-50 rounded border">
                    {result.data.followUpEmail.subject}
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Body</Label>
                  <div className="mt-1 p-3 bg-gray-50 rounded border text-sm whitespace-pre-wrap max-h-48 overflow-y-auto">
                    {result.data.followUpEmail.body}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Copy Email
                </Button>
              </CardContent>
            </Card>

            {/* ROI Impact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  ROI Impact
                </CardTitle>
                <CardDescription>
                  Time and value saved with automation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Time Saved</div>
                    <div className="text-sm font-semibold">{result.data.roiPreview.timesSaved}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Automation Rate</div>
                    <div className="text-sm font-semibold">{result.data.roiPreview.automationRate}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Follow-up Rate</div>
                    <div className="text-sm font-semibold">{result.data.roiPreview.followUpRate}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Monthly Value</div>
                    <div className="text-sm font-semibold text-green-600">
                      {result.data.roiPreview.estimatedValue}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personalized Insights */}
            {result.data.insights && result.data.insights.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Personalized Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.data.insights.map((insight, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 shrink-0" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Demo Mode Notice */}
        {!result && !isLoading && (
          <div className="lg:col-span-1">
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">ðŸŽ¯ What You'll See</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-blue-800">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>AI-optimized meeting times based on your preferences</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>Personalized follow-up email ready to send</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>Meeting agenda and preparation tips</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>ROI calculations showing time and cost savings</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>Industry-specific insights and recommendations</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">
              Ready to Save 11+ Hours Per Week?
            </h3>
            <p className="text-blue-100 max-w-2xl mx-auto">
              This demo shows just one of our AI automation agents. 
              Imagine the impact across your entire sales, customer service, and operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Button size="lg" variant="secondary">
                Book Strategy Call
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white hover:bg-white/10">
                View More Agents
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
