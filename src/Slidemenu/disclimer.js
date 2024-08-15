import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import configStyle from './configStyle';

const Disclaimer = () => {
  return (
    <View style={{flex: 1}}>
      <View style={{alignItems: 'center'}}>
        <Text style={configStyle.heading1}>Disclaimer</Text>
      </View>
      <ScrollView style={configStyle.container}>
        <View>
          <Text style={configStyle.heading2}>Disclaimer</Text>
          <Text style={configStyle.body}>
            The information provided on Rishi Jobs is for general informational
            purposes only. We strive to keep the information up to date and
            accurate, but we make no representations or warranties of any kind,
            express or implied, about the completeness, accuracy, reliability,
            suitability, or availability with respect to the website or the
            information, products, services, or related graphics contained on
            the website for any purpose. Any reliance you place on such
            information is therefore strictly at your own risk. In no event will
            we be liable for any loss or damage, including without limitation,
            indirect or consequential loss or damage, or any loss or damage
            whatsoever arising from loss of data or profits arising out of, or
            in connection with, the use of Rishi Jobs. Through Rishi Jobs, you
            can link to other websites that are not under our control. We have
            no control over the nature, content, and availability of those
            sites. The inclusion of any links does not necessarily imply a
            recommendation or endorse the views expressed within them. Every
            effort is made to keep [Job Portal Name] up and running smoothly.
            However, we take no responsibility for, and will not be liable for,
            the website being temporarily unavailable due to technical issues
            beyond our control.
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
      </ScrollView>
    </View>
  );
};

export default Disclaimer;

const styles = StyleSheet.create({});
