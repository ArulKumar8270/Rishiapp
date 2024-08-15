// configStyle.js

import { fonts } from "../../config";
import { fontSize, SIZES } from "../styles/config";

const configStyle = {
  container: {
    //padding: 20,
    //paddingVertical:30,
    paddingBottom:30,
    paddingHorizontal:20,
     // Align items to the top of the container,
    paddingBottom:'90%',
  },
  heading1: {
    width: '100%',
    fontFamily: fonts.CircularStdBlack,
    fontSize: SIZES.h1,
    color: '#fff',
    backgroundColor: '#3498db', 
    padding: 10,
    textAlign: 'center', // Center the heading text
    marginBottom:10
  },
  heading2: {
    fontFamily: fonts.CircularStdBlack,
    fontSize: SIZES.h2,
    color: '#1c2833',
    marginVertical: 5, // Add vertical margin to separate headings
  },
  body: {
    fontFamily: fonts.CircularStdBook,
    fontSize: SIZES.body2,
    color: '#808b96',
    marginVertical: 5,
  },
  bulletContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2c3e50',
    marginRight: 10,
    marginTop: 8, // Adjust for vertical alignment
  },
  bulletText: {
    fontFamily: fonts.CircularStdBook,
    fontSize: SIZES.body2,
    flex: 1,
    color: '#808b96',
  },
  image:{
    height:200,
    width:'100%'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#ccc',
    //alignItems:'center',
    paddingVertical: 5,
    paddingHorizontal: 25,
    width: '100%',
    //height: '92%',
    marginVertical: 10,
    //resizeMode: 'stretch',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  button: {
    marginTop: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: SIZES.radius,
    borderRadius: SIZES.radius,
    shadowOffset: {width: -2, height: 4},
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 6,
  },
};

export default configStyle;
