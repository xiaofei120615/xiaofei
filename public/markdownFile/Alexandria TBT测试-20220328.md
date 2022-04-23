### 1.Type C Port测试
- USB2.0/3.0侦测
- Type C 20GB速率测试，使用20GB测试盒子做读写测试

```
xwusbtest.exe
```

### 2.PCIE测试
```
pcie.exe
```

### 3.GPIO测试
```
XWADLGPIO.EXE K4  LOW     DG_FORCE_PWR
XWADLGPIO.EXE F1  LOW     DG_PEWAKE#
XWADLGPIO.EXE B11 HIGH    FM_TBT_SCI_EVENT
XWADLGPIO.EXE R8  HIGH    TBT_CBL_DET_N  
XWADLGPIO.EXE G1  HIGH    DG_RTD3_PWR_EN
```
注：G1默认为HIGH，实测为LOW

### 4.Dock测试
- 使用Intel提供的程式读取Thunderbolt FW
- 使用Intel提供的程式抓取Dock Cable和Dock

```
FwUpdateCmd.exe GetTopology
```

### 5.DP Port测试
Thunderbolt上两个DP Port接MB上对应的两个DP Port，从两个Type C Port接下Type C的显示线连接到显示器显示。

#### 注：需要先安装driver和APP