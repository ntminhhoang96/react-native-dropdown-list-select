import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Animated,
    TextInput,
    Easing
} from 'react-native';

import { SelectListProps } from '..';

type L1Keys = { code?: any; name?: any;  id?: any;  province_name?: any; district_name?: any;  province_id?: any; school_id?: any; district_id?: any; level?: any; disabled?: boolean | undefined }

const SelectList: React.FC<SelectListProps> =  ({
        setSelected,
        selectedValue,
        placeholder,
        boxStyles,
        inputStyles,
        dropdownStyles,
        dropdownItemStyles,
        dropdownTextStyles,
        maxHeight,
        data,
        defaultOption,
        searchicon = false,
        arrowicon = false,
        closeicon = false,
        search = true,
        searchPlaceholder = "Tìm kiếm",
        notFoundText = "không tìm thấy dữ liệu",
        disabledItemStyles,
        disabledTextStyles,
        onSelect = () => {},
        save = 'name',
        dropdownShown = false,
        fontFamily
    }) => {

    const oldOption = React.useRef(null)
    const [_firstRender,_setFirstRender] = React.useState<boolean>(true);
    const [dropdown, setDropdown] = React.useState<boolean>(dropdownShown);
    const [selectedval, setSelectedVal] = React.useState<any>("");
    const [height,setHeight] = React.useState<number>(200)
    const animatedvalue = React.useRef(new Animated.Value(0)).current;
    const [filtereddata,setFilteredData] = React.useState(data)


    const slidedown = () => {
        setDropdown(true)
        Animated.timing(animatedvalue,{
            toValue:height,
            useNativeDriver:false,
        }).start()
    }
    const slideup = () => {
        
        Animated.timing(animatedvalue,{
            toValue:0,
            useNativeDriver:false,
            
        }).start(() => setDropdown(false))
    }

    React.useEffect( () => {
        if(maxHeight)
            setHeight(maxHeight)
    },[maxHeight])

    
    React.useEffect(() => {
        setFilteredData(data);
      },[data])


    React.useEffect(() => {
        if(_firstRender){
          _setFirstRender(false);
          return;
        }
        onSelect()
    },[selectedval])
  

    React.useEffect(() => {
        // console.log(setSelected);
        // console.log(selectedval);
        
    },[setSelected])

    React.useEffect(() => {
        if(!_firstRender && defaultOption && oldOption.current != defaultOption.key ){
            // oldOption.current != null
            oldOption.current = defaultOption.key
            setSelected(defaultOption.key);
            setSelectedVal(defaultOption.value);
        }
        if(defaultOption && _firstRender && defaultOption.key != undefined){
            
            oldOption.current = defaultOption.key
            setSelected(defaultOption.key);
            setSelectedVal(defaultOption.value);
        }
        
    },[defaultOption])

    React.useEffect(() => {
        if(!_firstRender){
            if(dropdownShown)
                slidedown();
            else
                slideup();
            
        }
        
    },[dropdownShown])



    return(
        <View>
            {
                (dropdown && search)
                ?
                    <View style={[styles.wrapper,boxStyles]}>
                        <View style={{flexDirection:'row',alignItems:'center',flex:1}}> 
                            {
                                (!searchicon)
                                ?
                                <Image 
                                    source={require('../assets/images/search.png')}
                                    resizeMode='contain'
                                    style={{width:20,height:20,marginRight:7}}
                                />
                                :
                                searchicon
                            }
                            
                            <TextInput 
                                placeholder={searchPlaceholder}
                                onChangeText={(val) => {
                                    let result =  data.filter((item: L1Keys) => {
                                        val = val.toLowerCase();
                                        let row = item.name.toLowerCase()
                                        row = row.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
                                        row = row.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
                                        row = row.replace(/ì|í|ị|ỉ|ĩ/g, "i");
                                        row = row.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
                                        row = row.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
                                        row = row.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
                                        row = row.replace(/đ/g, "d");
                                        row = row.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
                                        " ");
                                        row = row.replace(/ + /g, " ");
                                        row = row.trim();
                                        return row.search(val) > -1;
                                    });
                                    setFilteredData(result)
                                }}
                                style={[{padding:0,height:20,flex:1,fontFamily},inputStyles]}
                            />
                                <TouchableOpacity onPress={() => {slideup(); setSelectedVal("");setSelected ? setSelected(null) : setSelected;}} >

                                {
                                    (!closeicon)
                                    ?
                                        <Image 
                                            source={require('../assets/images/close.png')}
                                            resizeMode='contain'
                                            style={{width:17,height:17}}
                                        />
                                    :
                                        closeicon
                                }
                                   
                                </TouchableOpacity>
                                
                           
                        </View>
                        
                    </View>
                :
                    <TouchableOpacity style={[styles.wrapper,boxStyles]} onPress={() => { if(!dropdown){ slidedown() }else{ slideup() } }}>
                        <Text style={[{fontFamily},inputStyles]}>{ selectedValue }</Text>
                        {
                            (!arrowicon)
                            ?
                                <Image 
                                    source={require('../assets/images/chevron.png')}
                                    resizeMode='contain'
                                    style={{width:20,height:20}}
                                />
                            :
                                arrowicon
                        }
                        
                    </TouchableOpacity>
            }
            
            {
                (dropdown)
                ?
                    <Animated.View style={[{maxHeight:animatedvalue},styles.dropdown,dropdownStyles]}>
                        <ScrollView  contentContainerStyle={{paddingVertical:10,overflow:'hidden'}} nestedScrollEnabled={true}>

                            {
                                (filtereddata.length >=  1)
                                ?
                                filtereddata.map((item: L1Keys,index: number) => {
                                    let key = item.code ?? item.name ?? item;
                                    let value = item.name ?? item;
                                    let level = item.level;
                                    let disabled = item.disabled ?? false;
                                    if(disabled){
                                        return(
                                            <TouchableOpacity style={[styles.disabledoption,disabledItemStyles]} key={index} onPress={ () => {}}>
                                                <Text style={[{color:'#c4c5c6',fontFamily},disabledTextStyles]}>{value}</Text>
                                            </TouchableOpacity>
                                        )
                                    }else{
                                        return(
                                            <TouchableOpacity style={[styles.option,dropdownItemStyles]} key={index} onPress={ () => {
                                                if(save === 'name'){
                                                    setSelected({ value, key, level });
                                                }else{
                                                    setSelected(key)
                                                }
                                                
                                                setSelectedVal(value)
                                                slideup()
                                                setTimeout(() => {setFilteredData(data)}, 100)
                                                console.log(selectedValue);
                                                
                                            }}>
                                                <Text style={[{fontFamily},dropdownTextStyles]}>{value}</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                    
                                })
                                :
                                <TouchableOpacity style={[styles.option,dropdownItemStyles]} onPress={ () => {
                                    setSelected(undefined)
                                    setSelectedVal("")
                                    slideup()
                                    setTimeout(() => setFilteredData(data), 100)
                                    
                                }}>
                                    <Text style={[{fontFamily},dropdownTextStyles]}>{notFoundText}</Text>
                                </TouchableOpacity>
                            }
                            
                            
                            
                        </ScrollView>
                    </Animated.View>
                :
                null
            }
            
            
        </View>
    )
}


export default SelectList;


const styles = StyleSheet.create({
    wrapper:{ borderWidth:1,borderRadius:10,borderColor:'gray', paddingVertical:12,flexDirection:'row',
    justifyContent:'space-between', borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0  },
    dropdown:{ borderWidth:1,borderRadius:10,borderColor:'gray',marginTop:10,overflow:'hidden'},
    option:{ paddingHorizontal:20,paddingVertical:8,overflow:'hidden' },
    disabledoption:{ paddingHorizontal:20,paddingVertical:8,flexDirection:'row',alignItems:'center', backgroundColor:'whitesmoke',opacity:0.9}

})
