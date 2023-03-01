import React, {useState} from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import {format, formatDistanceStrict, isEqual, eachDayOfInterval} from 'date-fns';

import {globalStyles} from '../../../styles/GlobalStyles';
import {complaintsData} from '../../../utils/constants';
import {getNextDay, getDayInDateFormat, getDayInNumberFormat} from '../../../utils/helpers';

type CycleItemProps = {
  cycle: {
    startDate: number;
    endDate: number;
  };
  expanded?: boolean;
};

export const CycleItem: React.FC<CycleItemProps> = ({cycle, expanded}) => {
  const [showComplients, setShowComplients] = useState(false);
  const getDropsComponent = (amount: number) => {
    return Array(amount)
      .fill(true)
      .map((_, i) => <Image key={i} style={cycleItemStyles.drop} source={require('../../../assets/images/drop.png')} />);
  };

  const {startDate: currentCycleFirstDay, endDate: currentCycleLastDay} = cycle;

  const getFormatedDaysTitle = (date: number) => format(getDayInDateFormat(date), 'dd MMM');

  const nextCycleFirstDay = getDayInNumberFormat(getNextDay(getDayInDateFormat(currentCycleLastDay)));


  const daysOfTheCycle = eachDayOfInterval({start: getDayInDateFormat(currentCycleFirstDay), end: getDayInDateFormat(currentCycleLastDay)});

  return <></>

  // return (
  //   <View style={cycleItemStyles.container}>
  //     <Text style={cycleItemStyles.title}>
  //       <Text style={{fontFamily: 'Nunito-Bold'}}>
  //         {isEqual(currentCycleLastDay, +format(new Date(), 'yyyyMMdd') * 1000000)
  //           ? 'Current cycle'
  //           : formatDistanceStrict(getDayInDateFormat(currentCycleFirstDay), getDayInDateFormat(currentCycleLastDay), {unit: 'day'})}
  //         :{' '}
  //       </Text>
  //       {isEqual(currentCycleLastDay, +format(new Date(), 'yyyyMMdd') * 1000000)
  //         ? 'Started ' +
  //           getFormatedDaysTitle(currentCycleFirstDay) +
  //           ` (${formatDistanceStrict(getDayInDateFormat(currentCycleFirstDay), getDayInDateFormat(currentCycleLastDay), {unit: 'day'})})`
  //         : getFormatedDaysTitle(currentCycleFirstDay) + ' - ' + getFormatedDaysTitle(currentCycleLastDay)}
  //     </Text>
  //     <Text style={cycleItemStyles.subtitle}>{flowLevelDataSampleBetween2Dates?.rows.filter(item => item?.content?.en?.measureValue?.value > 0).length}-day period</Text>
  //     <View style={cycleItemStyles.daysContainer}>
  //       {daysOfTheCycle.map((item, index) => {
  //         const day = format(new Date(item), 'dd');
  //         const userFlowLevelData = getTodayFlowLevelData(item);
  //         const userComplaintData = getTodayComplaintData(item);
  //         const userNotesData = getTodayNotesData(item);
  //         const isComplaint = userNotesData || userComplaintData?.length !== 0;

  //         return (
  //           <View style={cycleItemStyles.dayOfTheCycle} key={index}>
  //             <View style={[cycleItemStyles.day, userFlowLevelData && cycleItemStyles.dayHasPeriod]}>
  //               {(isComplaint || userFlowLevelData || index % 5 === 0) && (
  //                 <Text style={[cycleItemStyles.dayTitle, userFlowLevelData && cycleItemStyles.dayTitleHasPeriod]}>{day}</Text>
  //               )}
  //             </View>
  //             {isComplaint && <Image style={cycleItemStyles.complaint} source={require('../../../assets/images/triangle.png')} />}
  //           </View>
  //         );
  //       })}
  //     </View>
  //     {expanded && (
  //       <>
  //         <TouchableOpacity style={[cycleItemStyles.cyclesHistoryLinkContainer, globalStyles.mt12]} onPress={() => setShowComplients(!showComplients)}>
  //           <Text style={cycleItemStyles.cyclesHistoryLinkTitle}>{showComplients ? 'Hide complaints' : 'See complaints'}</Text>
  //           <View style={cycleItemStyles.arrowIcnContainer}>
  //             {showComplients ? (
  //               <Image style={cycleItemStyles.arrowIcn} source={require('../../../assets/images/smooth-close-purple.png')} />
  //             ) : (
  //               <Image style={cycleItemStyles.arrowIcn} source={require('../../../assets/images/purple-arrow-right.png')} />
  //             )}
  //           </View>
  //         </TouchableOpacity>
  //         {showComplients && (
  //           <View style={globalStyles.mt8}>
  //             {daysOfTheCycle.map((dayWithTheData, dayWithTheDataIndex) => {
  //               const day = format(new Date(dayWithTheData), 'dd MMM');
  //               const userFlowLevelData = getTodayFlowLevelData(dayWithTheData);
  //               const userComplaintData = getTodayComplaintData(dayWithTheData);
  //               const userNotesData = getTodayNotesData(dayWithTheData);
  //               const selectedComplaintsCodes = userComplaintData?.map(selectedComplain => selectedComplain.codes[0].code);

  //               return [
  //                 userFlowLevelData && (
  //                   <View key={`userFlowLevelData-${dayWithTheDataIndex}`} style={cycleItemStyles.symbolsItem}>
  //                     <View style={cycleItemStyles.symbolsIcnContainer}>
  //                       <Image style={cycleItemStyles.symbolsIcn} source={require('../../../assets/images/circle.png')} />
  //                     </View>
  //                     <Text style={[globalStyles.baseText, cycleItemStyles.symbolDayTitle]}>{day}:</Text>
  //                     <View style={cycleItemStyles.flowLevelContainer}>{getDropsComponent(userFlowLevelData.content.en.measureValue.value)}</View>
  //                   </View>
  //                 ),

  //                 userComplaintData?.length !== 0 && (
  //                   <View key={`userComplaintData-${dayWithTheDataIndex}`} style={cycleItemStyles.symbolsItem}>
  //                     <View style={cycleItemStyles.symbolsIcnContainer}>
  //                       <Image style={cycleItemStyles.symbolsIcn} source={require('../../../assets/images/triangle.png')} />
  //                     </View>
  //                     <Text style={[globalStyles.baseText, cycleItemStyles.symbolDayTitle]}>{day}:</Text>
  //                     <View style={cycleItemStyles.complientsTitlesList}>
  //                       {selectedComplaintsCodes?.map((complientCode, complientCodeIndex) => {
  //                         const complaintsLabel = complaintsData.find(complientObj => complientObj.SNOMED_CT_CODE === complientCode)?.label;
  //                         return (
  //                           <View key={complientCodeIndex}>
  //                             <Text style={cycleItemStyles.complientsTitle}>
  //                               {complaintsLabel}
  //                               {complientCodeIndex !== selectedComplaintsCodes?.length - 1 && ', '}
  //                             </Text>
  //                           </View>
  //                         );
  //                       })}
  //                     </View>
  //                   </View>
  //                 ),

  //                 !!userNotesData && (
  //                   <View key={`userNotesData-${dayWithTheDataIndex}`} style={cycleItemStyles.symbolsItem}>
  //                     <View style={cycleItemStyles.symbolsIcnContainer}>
  //                       <Image style={cycleItemStyles.symbolsIcn} source={require('../../../assets/images/triangle.png')} />
  //                     </View>
  //                     <Text style={[globalStyles.baseText, cycleItemStyles.symbolDayTitle]}>{day}:</Text>
  //                     <View style={cycleItemStyles.complientsTitlesList}>
  //                       <Text style={cycleItemStyles.complientsTitle}>{userNotesData?.content.en.stringValue}</Text>
  //                     </View>
  //                   </View>
  //                 ),
  //               ].filter(x => x);
  //             })}
  //           </View>
  //         )}
  //       </>
  //     )}
  //   </View>
  // );
};

const cycleItemStyles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 8,
    width: '100%',
  },
  title: {
    fontSize: 14,
    color: '#151B5D',
    fontFamily: 'Nunito-Regular',
  },
  subtitle: {
    fontSize: 10,
    color: '#A2A4BE',
    marginTop: 4,
    fontFamily: 'Nunito-Regular',
  },
  daysContainer: {
    marginTop: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayOfTheCycle: {
    padding: 3,
    width: 20,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 21,
    marginRight: 2,
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  day: {
    width: 15,
    height: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayHasPeriod: {
    backgroundColor: '#D06676',
  },
  dayTitle: {
    fontSize: 7,
    color: '#151B5D',
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
  },
  dayTitleHasPeriod: {
    color: '#FFFFFF',
  },
  complaint: {
    width: 6,
    height: 6,
  },
  cyclesHistoryLinkContainer: {
    width: '100%',
    height: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cyclesHistoryLinkTitle: {
    fontSize: 14,
    color: '#6273D9',
    fontFamily: 'Nunito-Bold',
  },
  arrowIcnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcn: {
    width: 15,
    height: 15,
  },
  symbolsItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    flex: 1,
  },
  symbolDayTitle: {
    height: 18,
    fontSize: 13,
    fontFamily: 'Nunito-Regular',
    marginRight: 8,
  },
  symbolsIcnContainer: {
    width: 12,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  symbolsIcn: {
    width: 12,
    height: 12,
  },
  complientsTitlesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  complientsTitle: {
    color: '#A2A4BE',
    fontSize: 13,
    fontFamily: 'Nunito-Regular',
  },
  drop: {
    width: 8,
    height: 8,
  },
  flowLevelContainer: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
});
