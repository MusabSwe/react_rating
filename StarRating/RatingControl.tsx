
import * as React from 'react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useConst } from "@uifabric/react-hooks";
import MaskedInput from './MaskedInput';
import { ITheme, Rating, RatingSize, createTheme, getTheme, initializeIcons, RatingBase } from '@fluentui/react';

export interface IRatingControlProps {
    //properties : PCF =>
    rating: number | undefined;
    icon: string;
    unselectdicon: string;
    color: string;
    maxvalue: number;

    isReadonly: boolean;
    isMasked: boolean;

    // Callback function : => PCF
    onChange: (rating: number | undefined) => void
}

const RatingControl = (props: IRatingControlProps): JSX.Element => {

    // ref Object
    const ratingRef = useRef<any>(null);

    // Memo
    const componentTheme = useMemo<ITheme>(() => {
        console.log("useMemo: custom theme");
        const customTheme: ITheme = createTheme(getTheme());
        customTheme.palette.themeDark = props.color; // hover
        customTheme.palette.themePrimary = props.color; // hover contour
        customTheme.palette.neutralPrimary = props.color; // icon color
        return customTheme;
    }, [props.color])

    //CUSTOM HOOK provided by FluentUI team :
    // https://github.com/microsoft/fluentui/tree/master/packages/react-hooks
    //Will run function once on first render, like a constructor.
    useConst(() => {
        console.log("useConst: initilize icons");
        initializeIcons();
    });

    // state
    const [rating, setRating] = useState<number | undefined>(props.rating);

    useEffect(() => {
        // if value is different from the one received from Props
        // send value back to caller (PCF)
        if (rating !== props.rating) {
            console.log("useEffect: => props.onChange(" + rating + ")");
            // Callback function : => PCF
            props.onChange(rating);
        }

    }, [rating])


    useEffect(() => {
        if (rating !== props.rating) {
            console.log("useEffect props.rating changed : " + props.rating);
            setRating(props.rating);
        }
    }, [props.rating])

    // Event Handllers
    // const onChangeEvent = (ev: any, newString?: any): void => {
    //     // console.log("Selceted star: ", newString);
    // };

    // Hack to put value at zero if the selected value clicked again
    const onClickEvent = (ev: React.MouseEvent<HTMLElement>): void => {
        console.log("in Click fun", ratingRef.current);
        if (ratingRef.current !== null) {
            console.log("in Click fun in if", ratingRef.current);
            const clickedRating = ratingRef.current.state.rating || undefined;
            console.log("Click: Previous value: " + rating + ", New value: " + clickedRating);
            // If clickedRating is the same as rating means that the selected item was click
            // otherwise set to new value
            const newRating = clickedRating === rating ? undefined : clickedRating;
            setRating(newRating);
        }
    };

    if (props.isMasked) {
        return <MaskedInput />
    } else {
        console.log("--> Component Rendering: rating = " + rating);
        console.log("ratingRef.current.state.rating ", ratingRef?.current?.state?.rating);
        console.log("ratingRef.current: ", ratingRef.current);
        return (
            <Rating
                componentRef={ratingRef}
                // ref={ratingRef}
                icon={props.icon}
                unselectedIcon={props.unselectdicon}
                min={0}
                max={props.maxvalue}
                size={RatingSize.Large}
                rating={rating ?? 0}
                allowZeroStars={true}
                // onChange={onChangeEvent}
                onClick={onClickEvent}
                theme={componentTheme}
                readOnly={props.isReadonly}
            />
        )
    }
}

export default RatingControl;