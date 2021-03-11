---
title: vscode访问服务器文件
date: 2021-01-05 14:49:27
tags:
- vscode
categories:
- skills
---
1.install `remote ssh` in vscode

2.click `remote explorer` and select `ssh targets`

3.click remote ssh `configure` or press `F1` and input remote-ssh:Open configuration file

4.selete path `~/.ssh/config`,and modify config file

if you dont have rsa ,please generate keys before

```shell
//optional
ssh-keygen
# passphrase can be empty and then generate keys in `~/.ssh`
# put *.pub (public key) to your server (~/.ssh/) and excute `cat id_rsa.pub >> authorized_keys` to merge Previous file
# now rsa keys are ready

```



```
Host alias
    HostName 8.888.88.8
    User root
    IdentityFile ~/.ssh/id_rsa
    RSAAuthentication yes
    PubkeyAuthentication yes
    PasswordAuthentication no
```

- Host alias-->your remote server name
- hostName-->server ip
- User-->login username
- IdentityFile-->private key path
- RSAAuthentication-->optional
- PubkeyAuthentication-->optional
- PasswordAuthentication-->no password login

5.login without password ready