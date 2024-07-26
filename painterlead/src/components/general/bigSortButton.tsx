export default function bigSortButton({ data } : {data: { name: string; color: string;}}) { 
    const {name, color}  = data;
    const style = ""

    return (
        <>
            <button className="">{name}</button>
        </>
    );
}