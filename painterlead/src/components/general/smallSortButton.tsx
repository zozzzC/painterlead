export default function SmallSortButton({name, color}: { name: String; color: String}) { 
    const style = "py-1 px-3 rounded-xl outline outline-" + color + " outline-10 hover:" + color + "";

    return (
        <>
            <button className={style}>{name}</button>
        </>
    );
}