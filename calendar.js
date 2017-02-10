

import React, { PropTypes, Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

export default class Calendar extends React.Component{
  constructor(props) {
    super(props);
    let checklist = {};
 
    //console.warn('trans check',this.props.check)
    for ( let i of this.props.check.values())
      {
        //console.warn('i',i)
        checklist[i]=true
      }
    //console.warn('in check',checklist)
    this.state = {
      startTime: this.props.startTime || new Date(),
      num: this.props.num || 2,
      holiday: this.props.holiday || {},
      check: checklist,
      headerStyle: this.props.headerStyle || {},
    };
  
  }
  onPress = (str) =>{
    const check = this.state.check
    let index = Object.keys(check).includes(str)
  
    if (check[str]===true ){
      let newArray = {...check}
      newArray[str]= false
      this.setState({check:newArray})
      //console.warn('in newArray',newArray)
    } else {
      let newArray = {...check}
      newArray[str]= true
      this.setState({check:newArray})

    }
    
    this.props.touchEvent(str)
  }
  render() {
    let date = this.state.startTime;
    let num = this.state.num;
    let holiday = this.state.holiday;
    let check = this.state.check;
    let headerStyle = this.state.headerStyle;

    let items = [];
    let dateNow = new Date();

    for(let n = 0; n < num; n++){
      /*循环完成一个月*/
      let rows = [];
      let newDate = new Date(date.getFullYear(), date.getMonth() + 1 + n, 0); //天数
      let week = new Date(date.getFullYear(), date.getMonth() + n, 1).getDay(); //月份开始的星期

      if(week === 0){
        week = 7;
      }
      let counts = newDate.getDate();
      let rowCounts = Math.ceil((counts + week - 1) / 7); //本月行数
      for(var i = 0; i < rowCounts; i++){
        var days = [];
        for(var j = (i * 7) + 1; j < ((i+1) * 7) + 1; j++){
          //根据每个月开始的［星期］往后推
          var dayNum = j - week + 1;
          if(dayNum > 0 && j < counts + week){
            //如果当前日期小于今天，则变灰
            let dateObj = new Date(date.getFullYear(), date.getMonth() + n, dayNum);
            let dateStr = dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dayNum;
            let grayStyle = {};
            let bk = {};
            if(dateNow >= new Date(date.getFullYear(), date.getMonth() + n, dayNum + 1)){
              grayStyle = {
                color:'#ccc'
              };
            }
            if(holiday[dateStr]){
              dayNum = holiday[dateStr];
            }
            if(check[dateStr]){
              bk = {
                backgroundColor: '#1EB7FF',
                width:46,
                height:35,
                alignItems: 'center',
                justifyContent: 'center'
              };
              grayStyle = {
                color:'#fff'
              };
            }
            days.push(
              <TouchableHighlight key={dateStr} style={[styles.flex_1]} underlayColor="#fff" onPress={()=>this.onPress(dateStr)}>
                <View style={bk}>
                  <Text style={grayStyle}>{dayNum}</Text>
                </View>
              </TouchableHighlight>
            );
          }else{
            days.push(
              <View style={[styles.flex_1]}>
                <Text></Text>
              </View>
            );
          }

        }
        rows.push(
          <View style={styles.row}>{days}</View>
        );
      }
      items.push(
        <View style={[styles.cm_bottom]}>
          <View style={styles.month}>
            <Text style={styles.month_text}>{newDate.getFullYear()}年{newDate.getMonth() + 1}月</Text>
          </View>
          {rows}
        </View>
      );

    }

    return (
        <View style={styles.calendar_container}>

          <View style={[styles.row, styles.row_header,{backgroundColor:'#3C9BFD'}]}>
            <View style={[styles.flex_1]}>
              <Text style={this.props.headerStyle}>一</Text>
            </View>
            <View style={[styles.flex_1]}>
              <Text style={this.props.headerStyle}>二</Text>
            </View>
            <View style={[styles.flex_1]}>
              <Text style={this.props.headerStyle}>三</Text>
            </View>
            <View style={[styles.flex_1]}>
              <Text style={this.props.headerStyle}>四</Text>
            </View>
            <View style={[styles.flex_1]}>
              <Text style={this.props.headerStyle}>五</Text>
            </View>
            <View style={[styles.flex_1]}>
              <Text style={[styles.week_highlight,  this.props.headerStyle]}>六</Text>
            </View>
            <View style={[styles.flex_1]}>
              <Text style={[styles.week_highlight,  this.props.headerStyle]}>日</Text>
            </View>
          </View>

          <ScrollView style={{flex:1,}}>

            {items}

          </ScrollView>

        </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'blue'
  },
  flex_1:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  calendar_container:{
    backgroundColor:'#fff',
    flex:1,
    borderTopWidth:1/PixelRatio.get(),
    borderBottomWidth:1/PixelRatio.get(),
    borderColor:'#ccc'
  },
  row_header:{
    backgroundColor:'#F5F5F5',
    borderBottomWidth:1/PixelRatio.get(),
    borderBottomColor:'#ccc',
  },
  row:{
    flexDirection:'row',
    height:35,
  },
  month:{
    alignItems:'center',
    justifyContent:'center',
    height:40,
  },
  month_text:{
    fontSize:18,
    fontWeight:'400',
  },
  week_highlight:{
    color:'#23B8FC'
  },
  cm_bottom:{
    borderBottomWidth:1/PixelRatio.get(),
    borderBottomColor:'#ccc',
  }
});

module.exports = Calendar;






