async function users() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users')
            if (!response.ok) throw new Error(`Ошибка ${response.status}`)
            const data = await response.json()
            return (data)
        } catch (error) {
            console.log(error)
        }
    }

export {users}