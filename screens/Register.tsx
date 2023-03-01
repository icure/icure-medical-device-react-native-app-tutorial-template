import React, {useEffect, useState} from 'react';
import {View, Image, Text, StyleSheet, ScrollView} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

import {RoundedInput, RoundedButton, TextHelper, ErrorMessage} from '../components/FormElements';
import {useNavigate} from 'react-router-native';
import {routes} from '../navigation/Router';

export const Register = (): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      userFirstName: '',
      userLastName: '',
      userEmail: '',
      userCode: '',
    },
  });
  const navigate = useNavigate();
  
  const [isWaitingForCode, setWaitingForCode] = useState(false);

  const onAskCode = (data: {userEmail: string; userFirstName: string; userLastName: string}) => {
      // TODO
  };

  const onRegister = (data: {userEmail: string; userFirstName: string; userLastName: string; userCode: string}) => {
      // TODO
  };

  return (
    <ScrollView style={styles.registerScreen}>
      <View style={styles.contentHolder}>
        <Image style={styles.logo} source={require('../assets/images/logo.png')} />
        <Text style={styles.heading}>Registration</Text>
        <View style={styles.inputsContainer}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => <RoundedInput label="First name" onBlur={onBlur} onChange={onChange} value={value} isRequired />}
            name="userFirstName"
          />
          {errors.userFirstName && <ErrorMessage text="This field is required." />}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => <RoundedInput label="Last name" onBlur={onBlur} onChange={onChange} value={value} isRequired />}
            name="userLastName"
          />
          {errors.userLastName && <ErrorMessage text="This field is required." />}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => <RoundedInput label="Email or phone number" onBlur={onBlur} onChange={onChange} value={value} isRequired />}
            name="userEmail"
          />
          {errors.userEmail && <ErrorMessage text="This field is required." />}

          {isWaitingForCode ? (
            <>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => <RoundedInput label="Code" onBlur={onBlur} onChange={onChange} value={value} isRequired />}
                name="userCode"
              />
              {errors.userCode && <ErrorMessage text="This field is required." />}
            </>
          ) : null}
        </View>

        {isWaitingForCode ? (
          <RoundedButton title="Register" onClick={handleSubmit(onRegister)} />
        ) : (
          <RoundedButton title="Receive a one time code" onClick={handleSubmit(onAskCode)} />
        )}

        <View style={styles.textHelperContainer}>
          <TextHelper text="Already have an account?" url="/" title="Log in" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  registerScreen: {
    flex: 1,
    height: '100%',
    paddingTop: 40,
    backgroundColor: '#FFFDFE',
  },
  heading: {
    fontSize: 24,
    color: '#151B5D',
    textAlign: 'center',
    marginBottom: 32,
    marginTop: 24,
    fontFamily: 'Nunito-Regular',
  },
  contentHolder: {
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: 201,
    height: 201,
    marginBottom: 32,
  },
  inputsContainer: {
    width: '100%',
    marginBottom: 12,
  },
  textHelperContainer: {
    marginTop: 24,
  },
});
