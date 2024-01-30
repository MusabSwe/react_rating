import { FontIcon, Stack, TextField, mergeStyles } from '@fluentui/react';
import * as React from 'react';

const MaskedInput = (): JSX.Element => {

    const maskedInputClass = mergeStyles({
        fontSize: 30,
        height: 30,
        width: 50,
        margin: "1px",
    });


    return (
        <Stack tokens={{ childrenGap: 2 }} horizontal>
            <FontIcon iconName="Look" className={maskedInputClass} />
            <TextField value='*********' style={{ width: "100%" }} />
        </Stack>
    );
}

export default MaskedInput;