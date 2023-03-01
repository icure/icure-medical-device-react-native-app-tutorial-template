import React, {useEffect, useState} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useNavigate} from 'react-router-native';

import {RoundedInput, RoundedButton, TextHelper, ErrorMessage} from '../components/FormElements';
import {routes} from '../navigation/Router';

export const Login = () => {
  const [isWaitingForCode, setWaitingForCode] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      userEmail: '',
      userCode: '',
    },
  });
  const navigate = useNavigate();

  const onLogin = (data: {userCode: string}) => {
    // TODO
  };
  const onAskCode = (data: {userEmail: string}) => {
    // TODO
  };

  return (
    <View style={styles.registerScreen}>
      <View style={styles.contentHolder}>
        <Image style={styles.logo} source={require('../assets/images/logo.png')} />
        <Text style={styles.heading}>Login</Text>
        <View style={styles.inputsContainer}>
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

        {isWaitingForCode ? <RoundedButton title="Login" onClick={handleSubmit(onLogin)} /> : <RoundedButton title="Receive a one time code" onClick={handleSubmit(onAskCode)} />}

        <View style={styles.textHelperContainer}>
          <TextHelper text="Not registered yet?" url="/register" title="Create an account" />
        </View>
      </View>
    </View>
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
