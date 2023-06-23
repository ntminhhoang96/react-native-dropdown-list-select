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

type L1Keys = { code?: any; name?: any; id?: any; province_name?: any; district_name?: any; province_id?: any; school_id?: any; district_id?: any; level?: any; disabled?: boolean | undefined }

const SelectList: React.FC<SelectListProps> = ({
    setSelected,
    selectToRemove,
    selectedValue,
    isRemovable = false,
    placeholder,
    boxStyles,
    inputStyles,
    dropdownStyles,
    dropdownItemStyles,
    dropdownTextStyles,
    maxHeight,
    data,
    defaultOption,
    removeIcon = false,
    searchicon = false,
    arrowicon = false,
    closeicon = false,
    search = true,
    searchPlaceholder = "Tìm kiếm",
    notFoundText = "không tìm thấy dữ liệu",
    disabledItemStyles,
    disabledTextStyles,
    onSelect = () => { },
    save = 'name',
    dropdownShown = false,
    fontFamily
}) => {

    const oldOption = React.useRef(null)
    const [_firstRender, _setFirstRender] = React.useState<boolean>(true);
    const [dropdown, setDropdown] = React.useState<boolean>(dropdownShown);
    const [selectedval, setSelectedVal] = React.useState<any>("");
    const [height, setHeight] = React.useState<number>(200)
    const animatedvalue = React.useRef(new Animated.Value(0)).current;
    const [filtereddata, setFilteredData] = React.useState(data)

    const accentMap = {
        'À': 'A',
        'Á': 'A',
        'Ả': 'A',
        'Ạ': 'A',
        'Â': 'A',
        'Ấ': 'A',
        'Ầ': 'A',
        'Ẩ': 'A',
        'Ậ': 'A',
        'Ẫ': 'A',
        'Ã': 'A',
        'Ä': 'A',
        'Å': 'A',
        'Æ': 'A',
        'à': 'a',
        'á': 'a',
        'ả': 'a',
        'ạ': 'a',
        'â': 'a',
        'ấ': 'a',
        'ầ': 'a',
        'ẩ': 'a',
        'ẫ': 'a',
        'ậ': 'a',
        'ã': 'a',
        'ä': 'a',
        'å': 'a',
        'æ': 'a',
        'Ā': 'A',
        'ā': 'a',
        'Ă': 'A',
        'Ắ': 'A',
        'Ằ': 'A',
        'Ẳ': 'A',
        'Ẵ': 'A',
        'Ặ': 'A',
        'ă': 'a',
        'ắ': 'a',
        'ằ': 'a',
        'ẳ': 'a',
        'ẵ': 'a',
        'ặ': 'a',
        'Ą': 'A',
        'ą': 'a',
        'Ç': 'C',
        'ç': 'c',
        'Ć': 'C',
        'ć': 'c',
        'Ĉ': 'C',
        'ĉ': 'c',
        'Ċ': 'C',
        'ċ': 'c',
        'Č': 'C',
        'č': 'c',
        'Ď': 'D',
        'ď': 'd',
        'Đ': 'D',
        'đ': 'd',
        'È': 'E',
        'É': 'E',
        'Ẹ': 'E',
        'Ê': 'E',
        'Ế': 'E',
        'Ề': 'E',
        'Ễ': 'E',
        'Ệ': 'E',
        'Ë': 'E',
        'è': 'e',
        'é': 'e',
        'ẹ': 'e',
        'ê': 'e',
        'ề': 'e',
        'ế': 'e',
        'ễ': 'e',
        'ệ': 'e',
        'ë': 'e',
        'Ē': 'E',
        'ē': 'e',
        'Ĕ': 'E',
        'ĕ': 'e',
        'Ė': 'E',
        'ė': 'e',
        'Ę': 'E',
        'ę': 'e',
        'Ě': 'E',
        'ě': 'e',
        'Ĝ': 'G',
        'ĝ': 'g',
        'Ğ': 'G',
        'ğ': 'g',
        'Ġ': 'G',
        'ġ': 'g',
        'Ģ': 'G',
        'ģ': 'g',
        'Ĥ': 'H',
        'ĥ': 'h',
        'Ħ': 'H',
        'ħ': 'h',
        'Ĩ': 'I',
        'Ì': 'I',
        'Í': 'I',
        'Ỉ': 'I',
        'Ị': 'I',
        'Î': 'I',
        'Ï': 'I',
        'ì': 'i',
        'í': 'i',
        'ỉ': 'i',
        'ị': 'i',
        'î': 'i',
        'ï': 'i',
        'ĩ': 'i',
        'Ī': 'I',
        'ī': 'i',
        'Ĭ': 'I',
        'ĭ': 'i',
        'Į': 'I',
        'į': 'i',
        'İ': 'I',
        'ı': 'i',
        'Ĳ': 'I',
        'ĳ': 'i',
        'Ĵ': 'J',
        'ĵ': 'j',
        'Ķ': 'K',
        'ķ': 'k',
        'ĸ': 'k',
        'Ĺ': 'L',
        'ĺ': 'l',
        'Ļ': 'L',
        'ļ': 'l',
        'Ľ': 'L',
        'ľ': 'l',
        'Ŀ': 'L',
        'ŀ': 'l',
        'Ł': 'L',
        'ł': 'l',
        'Ñ': 'N',
        'ñ': 'n',
        'Ń': 'N',
        'ń': 'n',
        'Ņ': 'N',
        'ņ': 'n',
        'Ň': 'N',
        'ň': 'n',
        'ŉ': 'n',
        'Ŋ': 'N',
        'ŋ': 'n',
        'Ò': 'O',
        'Ó': 'O',
        'Ỏ': 'O',
        'Ọ': 'O',
        'Ô': 'O',
        'Ơ': 'O',
        'Ớ': 'O',
        'Ờ': 'O',
        'Ở': 'O',
        'Ỡ': 'O',
        'Ợ': 'O',
        'Õ': 'O',
        'Ö': 'O',
        'ò': 'o',
        'ó': 'o',
        'ỏ': 'o',
        'ọ': 'o',
        'ô': 'o',
        'ố': 'o',
        'ồ': 'o',
        'ổ': 'o',
        'ỗ': 'o',
        'ộ': 'o',
        'ơ': 'o',
        'ớ': 'o',
        'ờ': 'o',
        'ỡ': 'o',
        'ợ': 'o',
        'ở': 'o',
        'õ': 'o',
        'ö': 'o',
        'Ō': 'O',
        'ō': 'o',
        'Ŏ': 'O',
        'ŏ': 'o',
        'Ő': 'O',
        'ő': 'o',
        'Œ': 'E',
        'œ': 'e',
        'Ø': 'O',
        'ø': 'o',
        'Ŕ': 'R',
        'ŕ': 'r',
        'Ŗ': 'R',
        'ŗ': 'r',
        'Ř': 'R',
        'ř': 'r',
        'ß': 'S',
        'Ś': 'S',
        'ś': 's',
        'Ŝ': 'S',
        'ŝ': 's',
        'Ş': 'S',
        'ş': 's',
        'Š': 'S',
        'š': 's',
        'Ţ': 'T',
        'ţ': 't',
        'Ť': 'T',
        'ť': 't',
        'Ŧ': 'T',
        'ŧ': 't',
        'Ù': 'U',
        'Ú': 'U',
        'Ủ': 'U',
        'Ụ': 'U',
        'Ư': 'U',
        'Ừ': 'U',
        'Ứ': 'U',
        'Ử': 'U',
        'Ữ': 'U',
        'Ự': 'U',
        'Û': 'U',
        'Ü': 'U',
        'ù': 'u',
        'ú': 'u',
        'ủ': 'u',
        'ụ': 'u',
        'û': 'u',
        'ư': 'u',
        'ứ': 'u',
        'ừ': 'u',
        'ử': 'u',
        'ữ': 'u',
        'ự': 'u',
        'ü': 'u',
        'Ũ': 'U',
        'ũ': 'u',
        'Ū': 'U',
        'ū': 'u',
        'Ŭ': 'U',
        'ŭ': 'u',
        'Ů': 'U',
        'ů': 'u',
        'Ű': 'U',
        'ű': 'u',
        'Ų': 'U',
        'ų': 'u',
        'Ŵ': 'W',
        'ŵ': 'w',
        'Ý': 'Y',
        'ý': 'y',
        'ÿ': 'y',
        'Ŷ': 'Y',
        'ŷ': 'y',
        'Ÿ': 'Y',
        'Ź': 'Z',
        'ź': 'z',
        'Ż': 'Z',
        'ż': 'z',
        'Ž': 'Z',
        'ž': 'z',
        'ё': 'е',
        'Ё': 'Е'
    };

    const slidedown = () => {
        setDropdown(true)
        Animated.timing(animatedvalue, {
            toValue: height,
            useNativeDriver: false,
        }).start()
    }
    const slideup = () => {

        Animated.timing(animatedvalue, {
            toValue: 0,
            useNativeDriver: false,

        }).start(() => setDropdown(false))
    }

    React.useEffect(() => {
        if (maxHeight)
            setHeight(maxHeight)
    }, [maxHeight])


    React.useEffect(() => {
        setFilteredData(data);
    }, [data])


    React.useEffect(() => {
        if (_firstRender) {
            _setFirstRender(false);
            return;
        }
        onSelect()
    }, [selectedval])


    React.useEffect(() => {
        // console.log(setSelected);
        // console.log(selectedval);

    }, [setSelected])

    React.useEffect(() => {
        if (!_firstRender && defaultOption && oldOption.current != defaultOption.key) {
            // oldOption.current != null
            oldOption.current = defaultOption.key
            setSelected(defaultOption.key);
            setSelectedVal(defaultOption.value);
        }
        if (defaultOption && _firstRender && defaultOption.key != undefined) {

            oldOption.current = defaultOption.key
            setSelected(defaultOption.key);
            setSelectedVal(defaultOption.value);
        }

    }, [defaultOption])

    React.useEffect(() => {
        if (!_firstRender) {
            if (dropdownShown)
                slidedown();
            else
                slideup();

        }

    }, [dropdownShown])



    return (
        <View>
            {
                (dropdown && search)
                    ?
                    <View style={[styles.wrapper, boxStyles]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                            {
                                (!searchicon)
                                    ?
                                    <Image
                                        source={require('../assets/images/search.png')}
                                        resizeMode='contain'
                                        style={{ width: 20, height: 20, marginRight: 7 }}
                                    />
                                    :
                                    searchicon
                            }

                            <TextInput
                                placeholder={searchPlaceholder}
                                onChangeText={(val) => {
                                    let result = data.filter((item: L1Keys) => {
                                        val = val.toLowerCase();
                                        val = val.replace(/[\W\[\] ]/g, a => accentMap[a] || a);
                                        console.log("🚀 ~ file: SelectList.tsx:413 ~ result ~ val:", val)
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
                                style={[{ padding: 0, height: 20, flex: 1, fontFamily }, inputStyles]}
                            />
                            <TouchableOpacity onPress={() => { slideup(); setSelectedVal(""); setSelected ? setSelected(null) : setSelected; }} >

                                {
                                    (!closeicon)
                                        ?
                                        <Image
                                            source={require('../assets/images/close.png')}
                                            resizeMode='contain'
                                            style={{ width: 17, height: 17 }}
                                        />
                                        :
                                        closeicon
                                }

                            </TouchableOpacity>


                        </View>

                    </View>
                    :
                    <TouchableOpacity style={[styles.wrapper, boxStyles]} onPress={() => { if (!dropdown) { slidedown() } else { slideup() } }}>
                        <Text style={[{ fontFamily }, inputStyles]}>{selectedValue}</Text>
                        {
                            (!arrowicon)
                                ?
                                <Image
                                    source={require('../assets/images/chevron.png')}
                                    resizeMode='contain'
                                    style={{ width: 20, height: 20 }}
                                />
                                :
                                arrowicon
                        }

                    </TouchableOpacity>
            }

            {
                (dropdown)
                    ?
                    <Animated.View style={[{ maxHeight: animatedvalue }, styles.dropdown, dropdownStyles]}>
                        <ScrollView contentContainerStyle={{ paddingVertical: 10, overflow: 'hidden' }} nestedScrollEnabled={true}>

                            {
                                (filtereddata.length >= 1)
                                    ?
                                    filtereddata.map((item: L1Keys, index: number) => {
                                        let key = item.code ?? item.name ?? item;
                                        let value = item.name ?? item;
                                        let level = item.level;
                                        let disabled = item.disabled ?? false;
                                        if (disabled) {
                                            return (
                                                <TouchableOpacity style={[styles.disabledoption, disabledItemStyles]} key={index} onPress={() => { }}>
                                                    <Text style={[{ color: '#c4c5c6', fontFamily }, disabledTextStyles]}>{value}</Text>
                                                </TouchableOpacity>
                                            )
                                        } else {
                                            return (
                                                <TouchableOpacity style={[styles.option, dropdownItemStyles]} key={index} onPress={() => {
                                                    if (save === 'name') {
                                                        setSelected({ value, key, level });
                                                    } else {
                                                        setSelected(key)
                                                    }

                                                    setSelectedVal(value)
                                                    slideup()
                                                    setTimeout(() => { setFilteredData(data) }, 100)

                                                }}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={[{ fontFamily }, dropdownTextStyles]}>{value}</Text>
                                                        <TouchableOpacity onPress={() => { selectToRemove(key)}}>{isRemovable ? removeIcon : null}</TouchableOpacity>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        }

                                    })
                                    :
                                    <TouchableOpacity style={[styles.option, dropdownItemStyles]} onPress={() => {
                                        setSelected(undefined)
                                        setSelectedVal("")
                                        slideup()
                                        setTimeout(() => setFilteredData(data), 100)

                                    }}>
                                        <Text style={[{ fontFamily }, dropdownTextStyles]}>{notFoundText}</Text>
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
    wrapper: {
        borderWidth: 1, borderRadius: 10, borderColor: 'gray', paddingVertical: 12, flexDirection: 'row',
        justifyContent: 'space-between', borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0
    },
    dropdown: { borderWidth: 1, borderRadius: 10, borderColor: 'gray', marginTop: 10, overflow: 'hidden' },
    option: { paddingHorizontal: 20, paddingVertical: 8, overflow: 'hidden' },
    disabledoption: { paddingHorizontal: 20, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', backgroundColor: 'whitesmoke', opacity: 0.9 }

})
