import useBearStore from "@/zustand/bear"

const Counter = () => {
    const { bears, addBear } = useBearStore()

    return (
        <div>
            <p>{bears}</p>
            <button onClick={() =>
                addBear(2)
            }>
                Add bear
            </button>
        </div>
    )
}

export default Counter