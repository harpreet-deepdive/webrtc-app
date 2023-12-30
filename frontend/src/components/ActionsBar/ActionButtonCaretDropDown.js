
const ActionButtonCaretDropDown = ({defaultValue,changeHandler,deviceList,type})=>{

    let dropDownEl;
    if(type==="video"){
        dropDownEl = deviceList.map(vd=><option className={'text-sm'} key={vd.deviceId} value={vd.deviceId}>{vd.label}</option>)
    }else if(type === "audio"){
        const audioInputEl = [];
        const audioOutputEl = [];
        deviceList.forEach((d,i)=>{
            if(d.kind === "audioinput"){
                audioInputEl.push(<option key={`input${d.deviceId}`} value={`input${d.deviceId}`}>{d.label}</option>)
            }else if(d.kind === "audiooutput"){
                audioOutputEl.push(<option key={`ouput${d.deviceId}`} value={`ouput${d.deviceId}`}>{d.label}</option>)
            }
        })
        audioInputEl.unshift(<optgroup label="Input Devices" />)
        audioOutputEl.unshift(<optgroup label="Output Devices" />)
        dropDownEl = audioInputEl.concat(audioOutputEl)
    }

    return(
        <div className="caret-dropdown absolute -top-9 left-2 rounded overflow-hidden text-sm">
            <select className={'text-sm border-none outline-none focus:outline-none'} defaultValue={defaultValue} onChange={changeHandler}>
                {dropDownEl}
            </select>
        </div>
    )
}

export default ActionButtonCaretDropDown