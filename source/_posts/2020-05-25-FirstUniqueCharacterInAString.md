---
title: 2020-05-25-FirstUniqueCharacterInAString
date: 2020-05-30 21:15:37
tags:
- Easy
categories:
- LeetCode
---
# Leetcode-64
```
Given a string, find the first non-repeating character in it and return it's index. If it doesn't exist, return -1.

Examples:

s = "leetcode"
return 0.

s = "loveleetcode",
return 2.
Note: You may assume the string contain only lowercase letters.
```

# solution 
```
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
    for(var i=0;i<s.length;i++){
        var flag = false;
        for(var j=0;j<s.length;j++){
            if(i==j)continue;
            if(s[i]==s[j])flag=true;
        }
        if(!flag)return i;
        
    }
    return -1;
};
```

```
class Solution {
    public int firstUniqChar(String s) {
        HashMap<Character, Integer> count = new HashMap<Character, Integer>();
        int n = s.length();
        // build hash map : character and how often it appears
        for (int i = 0; i < n; i++) {
            char c = s.charAt(i);
            count.put(c, count.getOrDefault(c, 0) + 1);
        }
        
        // find the index
        for (int i = 0; i < n; i++) {
            if (count.get(s.charAt(i)) == 1) 
                return i;
        }
        return -1;
    }
}
```