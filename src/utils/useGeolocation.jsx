import {useEffect, useState} from 'react';

const useGeoLocation = () => {
    //현위치
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lng: 0,lat: 0}
    });

    // 성공시
    const onSuccess = (location) => {
        setLocation({
            loaded: true,
            coordinates: {
                lng: location.coords.longitude.toFixed(6),
                lat: location.coords.latitude.toFixed(6),
            }
        })
    }

    // 실패시
    const onError = (error) => {
        setLocation({
            loaded: true,
            error,
        })
    }
    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            })
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, [])

    return location;
}

export default useGeoLocation