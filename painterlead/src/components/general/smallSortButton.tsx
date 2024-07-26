export default function SmallSortButton({name, color}: { name: String; color: String}) { 
    const style = "py-1 px-3 rounded-lg outline outline-" + color + " outline-4 hover:" + color + " bg-transparent";

    return (
        <>
            <button className={style}>{name}</button>
        </>
    );
}