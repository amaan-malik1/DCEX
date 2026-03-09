import { useState } from "react";
import useGetUserTokens from "../hooks/useGetTokens"
import AssetsSelector from "./AssetsSelector";

const SwapInput = ({ amount, baseToken, changeToken }: {
    amount: string;
    baseToken: string;
    changeToken: string;
}) => {
    const [selectedToken, setSeletcdToken] = useState();
    const [onSelect, setOnSelect] = useState();

    return (
        <div className="flex justify-between items-center p-2 w-2/3 h-1/3 bg-slate-400 rounded-md">
            {/* left  */}
            <AssetsSelector selectedToken={selectedToken} onSelect={onSelect} />


            {/* right */}
            <input type="text" className="w-2/3 h-max" />

        </div>
    )
}

export default SwapInput