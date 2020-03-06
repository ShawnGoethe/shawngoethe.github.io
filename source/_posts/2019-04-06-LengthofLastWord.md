---
title: LengthofLastWord
date: 2019-04-06 15:50:25
tags:
- easy
categories:
- LeetCode
---

# problem

> Given a string *s* consists of upper/lower-case alphabets and empty space characters `' '`, return the length of last word in the string.
>
> If the last word does not exist, return 0.
>
> **Note:** A word is defined as a character sequence consists of non-space characters only.
>
> **Example:**
>
> ```
> Input: "Hello World"
> Output: 5
> ```

# key

该方法调用了java的String.split(regex)所以在复杂度上回很高，大概仅仅beat了6%的玩家，但解决很快，正确的算法思维就倒序遍历，最后开始查往前，最后一个非空格查到空格结束

# solution

```java
//7ms
public int lengthOfLastWord(String s) {
		if(s.length()<=0)return 0;
		String[] tmp = s.split("\\s");
		int lastIndex = tmp.length-1;
		if(lastIndex<0) {
			return 0;
		}else {
			return tmp[lastIndex].length();
		}
		
	}
```

# perfect

```
class Solution {
    public int lengthOfLastWord(String s) {
        int n = s.length() - 1;
        int length = 0;
        for(int i = n; i >= 0; i--) {
            if(length == 0) {
                if(s.charAt(i) == ' ') {
                    continue;
                }else {
                    length++;
                }
            }else {
                if(s.charAt(i) == ' ') {
                    break;
                }
                else {
                    length++;
                }
            }
        }
        return length;
    }
}
```

