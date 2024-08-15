import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import configStyle from './configStyle';
import {faGreaterThan} from '@fortawesome/free-solid-svg-icons';

const Terms = () => {
  return (
    <View style={{flex:1}}>
      <View style={{alignItems: 'center'}}>
        <Text style={configStyle.heading1}>Terms & Conditions</Text>
      </View>
      <ScrollView style={configStyle.container}>
        <View style={{marginVertical: 5}}>
          <Text style={configStyle.heading2}>Terms & Conditions</Text>
          <Text style={configStyle.body}>
            Welcome to Rishi Jobs! These terms and conditions (Terms) outline
            the rules and regulations for the use of our job portal. By
            accessing this website and using our services, you agree to accept
            these Terms. If you disagree with any part of these Terms, you may
            not access the website or use our services.
          </Text>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={configStyle.heading2}>Account Registration</Text>
          <Text style={configStyle.body}>
            To access certain features of our job portal, you may need to create
            an account. You are responsible for maintaining the confidentiality
            of your account credentials and for all activities that occur under
            your account.
          </Text>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={configStyle.heading2}>Use of Services</Text>
          <Text style={configStyle.body}>
            Our job portal is intended for individuals seeking employment and
            employers seeking candidates for job opportunities. You agree to use
            our services only for lawful purposes and in accordance with these
            Terms and any applicable laws and regulations.
          </Text>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={configStyle.heading2}>User Content</Text>
          <Text style={configStyle.body}>
            When you submit content (such as resumes, job postings, or comments)
            on our platform, you retain ownership of your content. By submitting
            content, you grant us a non-exclusive, transferable, sub-licensable,
            royalty-free license to use, reproduce, modify, adapt, publish,
            translate, distribute, and display such content.
          </Text>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={configStyle.heading2}>Prohibited Activities</Text>
          <View style={configStyle.bulletContainer}>
            <View style={configStyle.bullet} />
            <Text style={configStyle.bulletText}>
              Violate any laws, regulations, or third-party rights
            </Text>
          </View>
          <View style={configStyle.bulletContainer}>
            <View style={configStyle.bullet} />
            <Text style={configStyle.bulletText}>
              Interfere with the proper functioning of the website
            </Text>
          </View>
          <View style={configStyle.bulletContainer}>
            <View style={configStyle.bullet} />
            <Text style={configStyle.bulletText}>
              Attempt to gain unauthorized access to any part of the website
            </Text>
          </View>
          <View style={configStyle.bulletContainer}>
            <View style={configStyle.bullet} />
            <Text style={configStyle.bulletText}>
              Transmit viruses or harmful code
            </Text>
          </View>
          <View style={configStyle.bulletContainer}>
            <View style={configStyle.bullet} />
            <Text style={configStyle.bulletText}>Intellectual Property.</Text>
          </View>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={configStyle.heading2}>Disclaimer of Warranties</Text>
          <Text style={configStyle.body}>
            We strive to provide accurate and reliable information on our
            platform, but we do not warrant the accuracy, completeness, or
            reliability of any content or information provided. Your use of the
            website is at your own risk.
          </Text>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={configStyle.heading2}>Limitation of Liability</Text>
          <Text style={configStyle.body}>
            We shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising out of your use or
            inability to use the website or services.
          </Text>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={configStyle.heading2}>Changes to Terms</Text>
          <Text style={configStyle.body}>
            We reserve the right to modify or replace these Terms at any time.
            Any changes will be effective upon posting the updated Terms on the
            website. Your continued use of the website after any such changes
            constitutes acceptance of the new Terms.
          </Text>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={configStyle.heading2}>Governing Law</Text>
          <Text style={configStyle.body}>
            These Terms are governed by and construed in accordance with the
            laws of [Jurisdiction]. Any disputes arising from these Terms shall
            be subject to the exclusive jurisdiction of the courts in
            [Jurisdiction].
          </Text>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={configStyle.heading2}>Contact Us</Text>
          <Text style={configStyle.body}>
            If you have any questions or concerns regarding these Terms, please
            contact us at info@rishijobs.com.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Terms;

const styles = StyleSheet.create({});
