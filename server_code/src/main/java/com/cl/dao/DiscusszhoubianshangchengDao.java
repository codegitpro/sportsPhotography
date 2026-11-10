package com.cl.dao;

import com.cl.entity.DiscusszhoubianshangchengEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.DiscusszhoubianshangchengView;


/**
 * 周边商城评论表
 * 
 * @author 
 * @email 
 * @date 2026-03-12 19:47:42
 */
public interface DiscusszhoubianshangchengDao extends BaseMapper<DiscusszhoubianshangchengEntity> {
	
	List<DiscusszhoubianshangchengView> selectListView(@Param("ew") Wrapper<DiscusszhoubianshangchengEntity> wrapper);

	List<DiscusszhoubianshangchengView> selectListView(Pagination page,@Param("ew") Wrapper<DiscusszhoubianshangchengEntity> wrapper);
	
	DiscusszhoubianshangchengView selectView(@Param("ew") Wrapper<DiscusszhoubianshangchengEntity> wrapper);


}
