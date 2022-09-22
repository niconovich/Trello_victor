async function users() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users')
            if (!response.ok) throw new Error(`Ошибка ${response.status}`)
            const data = await response.json()
            let StorageParam=[]
            data.forEach((item)=>{
                const user = new Object();
                user.id=item.id
                user.name=item.name
                StorageParam.push(user)
            })
            localStorage.setItem('usersJson', JSON.stringify(StorageParam));
            return (data)
        } catch (error) {
            console.log(error)
        }
    }

export {users}