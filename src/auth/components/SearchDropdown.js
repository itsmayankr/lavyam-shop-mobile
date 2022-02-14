import React, { useState, useRef, useEffect } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
} from 'react-native';
import Colors from '../../utils/Colors';

export default function SearchDropDown({ value, placeholder, keyboardType, dataSource, onChangeValue, editable = true, instant, changeValueMarket, textRef }) {
    // const [dataSource] = useState([{label:'apple',value:"apple"},{label:'banana',value:"banana"},{label:'cow',value:"cow"},{label:'4545',value:"4545"},{label:'454566',value:"12321dsfsd"}])
    const [searching, setSearching] = useState(false)
    const [focus, setFocus] = useState(false)
    const [filtered, setFiltered] = useState(dataSource)
    const [changeValue, setChangeValue] = useState(null)
    const [changeValueCust, setChangeValuecust] = useState(null)

    useEffect(() => {
        setFiltered(dataSource)
    }, [dataSource])

    useEffect(() => {
        if (placeholder === "Pincode") {
            console.log("Pincode onChnage Invoked")
            // setChangeValuecust("asd")
            textRef?.current?.clear()
        }
        if (placeholder === "Market") {
            console.log("Market onChange invoked")
            instant = "true"
            setChangeValuecust(changeValue)
        }
    }, [placeholder, changeValue])

    const onSearch = (text) => {
        setChangeValue(text);

        if (text.length === 0) value("")
        onChangeValue(text)
        if (text) {
            setSearching(true)
            const temp = text.toLowerCase()

            const tempList = dataSource.filter(item => item.label.toLowerCase().match(temp))
            // const tempList = dataSource.filter(item => item.label.toLowerCase().match(changeValue))
            setFiltered(tempList)
        }
        else {
            setSearching(false)
            setFiltered(dataSource)
        }

    }

    const handleOnSelect = (item) => {
        changeValueMarket = null
        setChangeValue(item.label)
        if (placeholder === "Market") {
            setChangeValuecust(item.label)
        }
        value(item.value)
        setSearching(false)

        // if (placeholder === "Market") {
        //     const tempList = dataSource.filter(item => item.label.toLowerCase().match(changeValue))
        //     if (!tempList) {
        //         setChangeValue("")
        //     }
        // }
    }

    const handlePress = () => {
        setFocus(true)
    }

    return (
        <View style={{ paddingHorizontal: 40 }} >
            <View >
                <TextInput
                    style={styles.textInput}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.green}
                    onChangeText={onSearch}
                    ref={textRef}
                    keyboardType={keyboardType || null}
                    // maxLength={6}
                    value={instant === "true" ? changeValueCust : changeValue}
                    editable={editable.toString() == "false" ? false : true}
                    onPressOut={handlePress}
                />
            </View>
            {(searching) && <View style={styles.container}>
                {
                    filtered?.length ?
                        filtered.map((item, i) => {
                            return (<TouchableOpacity
                                key={i} >
                                <Text onPress={() => handleOnSelect(item)} style={styles.itemText}>{item.label}</Text>
                            </TouchableOpacity>
                            )
                        })
                        :
                        <View
                            style={styles.noResultView}>
                            <Text style={styles.noResultText}>No search items matched</Text>
                        </View>
                }
            </View>}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        marginTop: 1,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    subContainer: {

        backgroundColor: '#84DCC6',
        paddingTop: 10,
        marginHorizontal: 20,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        flexWrap: 'wrap',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    itemView: {
        backgroundColor: 'white',
        height: 30,
        width: '90%',
        marginBottom: 10,
        justifyContent: 'center',
        borderRadius: 4,
    },
    itemText: {
        color: Colors.black,
        paddingHorizontal: 10,
        paddingVertical: 8,
        textTransform: "capitalize",
        fontSize: 14
    },
    noResultView: {
        alignSelf: 'center',
        // margin: 20,
        height: 100,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    noResultText: {
        fontSize: 14,
        color: Colors.black
    },
    textInput: {
        backgroundColor: '#fff',
        color: Colors.green,
        borderWidth: 1,
        borderColor: Colors.green,
        marginTop: 20,
        minWidth: "100%",
        // marginHorizontal:20,
        borderRadius: 5,
        height: 50,
        fontSize: 16,
        // fontWeight: 'bold',
        paddingHorizontal: 10,
    },
});