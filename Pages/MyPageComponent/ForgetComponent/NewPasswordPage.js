import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    TextInput,
    Picker,
    Dimensions,
    StatusBar,
    Alert
} from 'react-native';
import NetUtils from "../../Common/NetUtils";
const {width} = Dimensions.get('window');
let url = 'http://47.98.148.58/app/user/forgetThePwd.do';
export default class Change_Password extends Component{
    static navigationOptions={
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center'
        },
        headerRight: (
            <View/>
        ),
        headerStyle:{
            marginTop:StatusBar.currentHeight
        }
    };
    constructor(props){
        super(props);
        this.utils=new NetUtils;
        this.state=({
            newPwd:"",
            oldPwd:""
        })
    }
    _CheckNum(Password) {
        const correctPass =/^[a-zA-Z0-9]{6,21}$/;
        let regPass = new RegExp(correctPass);
        if (!regPass.test(Password)){
            Alert.alert(
                '提示', //提示标题
                "请输入正确的密码", //提示内容
                [
                    {
                        text: '确定'
                    }
                ] //按钮集合
            );
        }else {
            this.onLoad()
        }
    }
    onLoad() {
        this.utils.fetchNetRepository(url,
            {"password":this.state.newPwd})
            .then(result => {
                console.log(result);
                if(result.code === 0){
                    Alert.alert(
                        '提示', //提示标题
                        '修改成功', //提示内容
                        [
                            {
                                text: '确定'
                            }
                        ] //按钮集合
                    );
                    this.props.navigation.navigate('Second')
                }else {
                    alert("修改失败")
                }
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error),
                })
            })
    }
    render(){
        return(
            <View style={styles.First}>
                <View style={styles.container1}>
                    <View style={{justifyContent:'center',
                        alignItems:'center',width:70,backgroundColor:'white'}}>
                        <Text style={styles.old}>新密码</Text>
                    </View>
                    <TextInput
                        placeholder={'输入原密码'}
                        maxLength={11}
                        style={{width:width-70,backgroundColor:'white'}}
                        underlineColorAndroid={'transparent'}
                        keyboardType={'default'}
                        onChangeText={(text)=>this.setState({oldPwd:text})}
                    />

                </View>
                <View style={styles.container2}>
                    <View style={{justifyContent:'center',
                        alignItems:'center',width:70,backgroundColor:'white'}}>
                        <Text style={styles.old}>确认密码</Text>
                    </View>
                    <TextInput
                        placeholder={'输入新密码'}
                        maxLength={11}
                        style={{width:width-70,backgroundColor:'white'}}
                        underlineColorAndroid={'transparent'}
                        keyboardType={'default'}
                        onChangeText={(text)=>this.setState({newPwd:text})}
                    />

                </View>
                <TouchableOpacity

                    onPress={()=>{
                        if (this.state.newPwd !== this.state.oldPwd) {
                            Alert.alert(
                                '提示', //提示标题
                                '请确认前后密码输入一致', //提示内容
                                [
                                    {
                                        text: '确定'
                                    }
                                ] //按钮集合
                            );
                        }else {
                            let str = this.state.newPwd;
                            let Str = str.replace(/\"/g,"");
                            this._CheckNum(Str)
                        }
                    }}
                    style={styles.touch}
                >
                    <Text style={{fontSize:19,color:'black'}}>完 成</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    First:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#F3F4F6'
    },
    container2:{
        flexDirection:'row',
        paddingTop:2,
        paddingBottom:40,
    },
    container1:{
        flexDirection:'row',
        paddingTop:20,
    },
    picker:{
        width:80,
        alignItems:'center',
        backgroundColor:'white',
        color:'gray',
        marginLeft:30
    },
    touch:{
        backgroundColor:'#FFE059',
        borderRadius:5,
        width:width-60,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        marginTop:20
    },
    old:{
        color:'black',
        fontSize:15
    }
});