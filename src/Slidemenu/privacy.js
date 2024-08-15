import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import configStyle from './configStyle';

const Privacy = () => {
  return (
    <View>
      <View style={{alignItems: 'center'}}>
        <Text style={configStyle.heading1}>Privacy Policy</Text>
      </View>
      <ScrollView style={configStyle.container}>
        <View>
          <Text style={configStyle.heading2}>Privacy Policy</Text>
          <Text style={configStyle.body}>
            Rishi Jobs is committed to protecting the privacy of our users. This
            Privacy Policy outlines how we collect, use, disclose, and protect
            your personal information when you use our job portal services.
          </Text>
        </View>
        <View>
          <Text style={configStyle.heading2}>Information Collection</Text>
          <Text style={configStyle.body}>
            We collect personal information provided by you when you register an
            account, submit a job application, or interact with our platform.
            This may include your name, contact information, resume/CV,
            employment history, and other relevant details.
          </Text>
        </View>
        <View>
          <Text style={configStyle.heading2}>Use of Information</Text>
          <Text style={configStyle.body}>
            We use the collected information to facilitate job matches, improve
            our services, communicate with you about job opportunities, and
            personalize your experience on our platform. Your information may
            also be used for analytics and statistical purposes to enhance our
            services.
          </Text>
        </View>
        <View>
          <Text style={configStyle.heading2}>Information Sharing</Text>
          <Text style={configStyle.body}>
            Your information may be shared with prospective employers or
            third-party service providers involved in the job application
            process. We take measures to ensure these entities adhere to data
            protection laws and maintain the confidentiality of your
            information.
          </Text>
        </View>
        <View>
          <Text style={configStyle.heading2}>Data Security</Text>
          <Text style={configStyle.body}>
            We prioritize the security of your personal information and employ
            industry-standard security measures to safeguard it from
            unauthorized access, disclosure, alteration, or destruction.
          </Text>
        </View>
        <View>
          <Text style={configStyle.heading2}>
            Cookies and Tracking Technologies
          </Text>
          <Text style={configStyle.body}>
            We may use cookies and similar tracking technologies to enhance user
            experience, track usage patterns, and gather information about how
            our platform is accessed and used.
          </Text>
        </View>
        <View>
          <Text style={configStyle.heading2}>Your Choices</Text>
          <Text style={configStyle.body}>
            You have the right to review, update, or delete your account
            information. You may also manage your communication preferences or
            opt-out of certain communications.
          </Text>
        </View>
        <View>
          <Text style={configStyle.heading2}>Changes to this Policy</Text>
          <Text style={configStyle.body}>
            We reserve the right to update or modify this Privacy Policy. Any
            changes will be posted on this page with an updated effective date.
            Your continued use of our services after any modifications indicates
            your acceptance of the updated Privacy Policy.
          </Text>
        </View>
        <View>
          <Text style={configStyle.heading2}>Contact Us</Text>
          <Text style={configStyle.body}>
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or the handling of your personal information, please
            contact us at info@rishijobs.com.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Privacy;

const styles = StyleSheet.create({});
