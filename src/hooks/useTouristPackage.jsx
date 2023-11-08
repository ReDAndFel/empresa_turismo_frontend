export const useTouristPackage = () =>{

    const touristPackageDTO = {

    }

    const [touristPackage, setTouristPackage] = useState(touristPackageDTO)
    const [touristPackageList, setTouristPackageList] = useState([
        {

        }
    ])

    return {touristPackageList}
}