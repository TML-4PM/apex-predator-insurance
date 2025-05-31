
import React from 'react';
import Layout from '@/components/Layout';
import ContactForm from '@/components/ContactForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MessageCircle, Globe, Clock, HeadphonesIcon } from 'lucide-react';

const Contact = () => {
  return (
    <Layout>
      <div className="pt-28 pb-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-apex-black mb-6 animate-fade-up">
                Get in Touch
              </h1>
              <p className="text-xl text-apex-darkgray/70 animate-fade-up animate-delay-100">
                We're here to help you every roar of the way
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              
              {/* Contact Methods */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-apex-black mb-8">Multiple Ways to Reach Us</h2>
                
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Mail className="text-apex-red" size={24} />
                      Email Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-apex-darkgray mb-4">
                      Our most popular support channel - we reply within 4 hours during business hours.
                    </p>
                    <a 
                      href="mailto:support@apexpredatorinsurance.com"
                      className="text-apex-red hover:text-apex-red/80 font-medium"
                    >
                      support@apexpredatorinsurance.com
                    </a>
                    <div className="flex items-center gap-2 mt-2 text-sm text-apex-darkgray/70">
                      <Clock size={16} />
                      <span>9 AM - 5 PM AEST, Mon-Fri</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Phone className="text-apex-red" size={24} />
                      Phone Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-apex-darkgray mb-4">
                      Speak directly with our Australian-based team for urgent matters.
                    </p>
                    <a 
                      href="tel:+61424882136"
                      className="text-apex-red hover:text-apex-red/80 font-medium text-lg"
                    >
                      +61 0424 882 136
                    </a>
                    <div className="flex items-center gap-2 mt-2 text-sm text-apex-darkgray/70">
                      <Clock size={16} />
                      <span>9 AM - 5 PM AEST, Mon-Fri</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <MessageCircle className="text-apex-red" size={24} />
                      Live Chat
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-apex-darkgray mb-4">
                      Get instant responses during business hours via our chat bubble.
                    </p>
                    <Button className="bg-apex-red hover:bg-apex-red/90">
                      <MessageCircle size={16} className="mr-2" />
                      Start Live Chat
                    </Button>
                    <div className="flex items-center gap-2 mt-2 text-sm text-apex-darkgray/70">
                      <HeadphonesIcon size={16} />
                      <span>Instant responses during business hours</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Globe className="text-apex-red" size={24} />
                      Bulk Orders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-apex-darkgray mb-4">
                      Corporate gifts, events, or 10+ certificates? We've got special pricing.
                    </p>
                    <a 
                      href="mailto:bulk@apexpredatorinsurance.com"
                      className="text-apex-red hover:text-apex-red/80 font-medium"
                    >
                      bulk@apexpredatorinsurance.com
                    </a>
                    <div className="text-sm text-apex-darkgray/70 mt-2">
                      Custom pricing • DHL/FedEx express options • Volume discounts
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold text-apex-black mb-8">Send Us a Message</h2>
                <Card>
                  <CardContent className="p-6">
                    <ContactForm />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-apex-lightgray rounded-xl p-8">
              <h2 className="text-2xl font-bold text-apex-black mb-6 text-center">Quick Questions?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-apex-black mb-2">Need to make a change?</h3>
                  <p className="text-apex-darkgray text-sm">
                    Update personalisation within 24 hours of purchase—just reply to your confirmation email.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-apex-black mb-2">Refunds or shipping issues?</h3>
                  <p className="text-apex-darkgray text-sm">
                    See our Refund & Returns Policy or email support@apexpredatorinsurance.com.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
