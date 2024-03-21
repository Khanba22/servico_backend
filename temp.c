// algo mColor(k){
//     repeat{
//         nextValue(k)
//         if (x[k] == 0)
//         {
//             return;
//         }
//         if (k == n)
//         {
//             printf("array");
//         }else{
//             mColor(k+1)
//         }
//     }until false
// }

// algo nextValue(k){
//     x[k] = (x[k] + 1)%(n+1);
//     //Constraint Check
//     if(x[k] == 0){
// return;
// }
//     for i = 1 to n do{
//         if (g[i,k] != -1 and x[i] != x[k])
//         {
//             break;
//         }
//     }
//     if (i = k+1)
//     {
//         // Accept The Node
//     }
// }

// Hamilton Cycle

// algo hCycle(k)
// {
//     repeat
//     {
//         nextValue(k) if (x[k] == 0)
//         {
//             return;
//         }
//         if (k == n)
//         {
//             print(x);
//         }
//         else
//         {
//             hCycle(k + 1)
//         }
//     }
//     until False;
// }

// algo nextValue(k)
// {
//     x[k] = (x[k] + 1) mod(n + 1);
//     if (x[k] == 0)
//     {
//         return;
//     }
//     //Constraint Checking
//     for (i = 1 to k - 1)
//     {
//         if (i == k)
//         {
//             break;
//         }
//     }
//     if (i == k)
//     {
//         if (k < n or (k == n and G[x[k],x[i]] != 0))
//         {
//             Accept The Node
//         }
//     }
// }